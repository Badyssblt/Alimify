import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {CameraView, BarcodeScanningResult, Camera} from 'expo-camera';
import axios from "axios";
import axiosInstance from "@/app/api/axiosInstance";
import Confirmation from "@/components/Confirmation";
import {useFoodContext} from "@/context/FoodContext";

type ScannerProps = {
    courseId: number
}

export default function Scanner({ courseId }: ScannerProps) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [scannedData, setScannedData] = useState<{ type: string; data: string } | null>(null);
    const [courseCreated, setCourseCreated] = useState<boolean>(false);
    const [price, setPrice] = useState<string>("");
    const [priceModal, setPriceModal] = useState<boolean>(false)
    const [barcode, setBarcode] = useState<string | null>(null);

    const { refetch } = useFoodContext();


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const getFood = async (barcode: string) => {
        try {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            if (response.data) {
                return response.data['product'];
            } else {
                alert('Produit non trouvé');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
            alert('Erreur lors de la récupération des données');
        }
    }

    const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
        if (scanned) return;

        const { type, data } = scanningResult;

        setScanned(true);
        setScannedData({ type, data });
        setBarcode(data);

        const isIn = await isInCourse(data);

        if(isIn){
            setPriceModal(false)
            await validateChange(data)
        }else {
            setPriceModal(true)
        }



    };

    const isInCourse = async (barCode) => {
        try {
            const response = await axiosInstance.get('/api/foods/' + barCode + "/course")
            return !!response.data;
        }catch (e) {
            return false;
        }
    }

    const validateChange = async (data: string | null) => {

        console.log(data)

        if (data == null) {
            console.log(barcode)
            const food = await getFood(barcode);
            await addFood(food, barcode);
        }else {
            const food = await getFood(data);
            await addFood(food, data);
        }

        setPriceModal(false);
    };



    const addFood = async (productInfo: any, code: string) => {
        try {
            await axiosInstance.post('/api/foods', {
                courseId: courseId,
                name: productInfo.product_name,
                calory: productInfo.nutriscore_data?.is_water === "1" ? 0 : productInfo.nutriments["energy-kcal"],
                nutriScore: productInfo.nutriscore["2021"].grade,
                quantity: 1,
                image: productInfo.image_url,
                barCode: code,
                price: parseFloat(price.replace(',', '.'))
            });
            refetch()
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'aliment : ", error);
        }
    };

    if (hasPermission === null) {
        return <Text>Demande de permission pour utiliser la caméra</Text>;
    }
    if (!hasPermission) {
        return <Text>Accès à la caméra refusé</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={handleBarCodeScanned}
            />
            <View style={styles.scanArea}>
                <Text style={styles.scanText}>Placez le code-barres ici</Text>
            </View>
            {scanned && (
                <Button title={'Scanner à nouveau'} onPress={() => {
                    setScanned(false);
                    setScannedData(null);
                }} />
            )}
            { priceModal && <Confirmation confirmationTitle={"Quelle est le prix de ce produit ?"}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="Entrez un nombre"
                        onSubmitEditing={() => validateChange()}
                    />
                </View>

            </Confirmation>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50
    },
    input: {
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.2)",
        padding: 5,
        borderRadius: 5,
        marginTop: 40
    },
    scanArea: {
        position: 'absolute',
        top: '40%',
        left: '10%',
        width: '80%',
        height: '20%',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    scanText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dataContainer: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
    },
});
