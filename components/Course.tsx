// CourseDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axiosInstance from '@/app/api/axiosInstance';
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import courses from "@/app/(tabs)/courses";
import Scanner from "@/components/Scanner";
import Confirmation from "@/components/Confirmation";
import {useFoodContext} from "@/context/FoodContext";

type Food = {
    id: number;
    courseId: number;
    name: string;
    description: string;
    image: string;
    calory: number;
    nutriScore: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    price: number
};

type Course = {
    name: string;
    createdAt: string;
    updatedAt: string;
    foodsCount: number;
    id: number;
    foods: Array<Food>;
};

type CourseDetailProps = {
    route: RouteProp<{ params: { id: number } }, 'params'>;
};

export default function Course({ route }: CourseDetailProps) {
    // @ts-ignore
    const { id, refreshCourses } = route.params;
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

    const navigation = useNavigation();
    const colors = useThemeColors();

    const { refetch } = useFoodContext();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };



    const fetchCourseDetails = async (courseId: number) => {
        try {
            const response = await axiosInstance.get(`/api/courses/${courseId}`);
            setCourse(response.data);
            setFilteredFoods(response.data.food);
        } catch (err) {
            setError('Erreur de chargement des détails de la course');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async () => {
        try {
            await axiosInstance.delete('/api/courses/' + id);
            if (refreshCourses) {
                await refreshCourses();
            }
            refetch();
            // @ts-ignore
            navigation.navigate('CoursesList')
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCourseDetails(id);
    }, [id]);

    useEffect(() => {
        if (course) {
            const filtered = course.foods.filter(food =>
                food.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredFoods(filtered);
        }
    }, [searchText, course]);

    if (loading) {
        return <Text>Chargement...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!course) {
        return <Text>Aucune course trouvée.</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.topContainer, { backgroundColor: colors.tint }]}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/images/arrow-left.png')} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <ThemedText color={"white"} variant={"title"} styles={{ fontWeight: "bold" }}>
                        Course du {formatDate(course.createdAt)}
                    </ThemedText>
                </View>
                <TouchableOpacity onPress={() => setConfirmationModal(true)}>
                    <Image source={require('@/assets/images/trash.png')} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.green }]} onPress={() => setIsOpen(true)}>
                <ThemedText>Ajouter des produits</ThemedText>
            </TouchableOpacity>

            {isOpen && <Scanner courseId={id}/>}
            {/* Rechercher */}
            <View style={styles.inputContainer}>
                <ThemedText>Rechercher</ThemedText>
                <TextInput
                    placeholder="Pomme de terre"
                    style={styles.input}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            {
                course.foods.length > 0 ?
                <FlatList
                data={filteredFoods}
                keyExtractor={(item) => item.id.toString()}
                style={styles.foodContainer}
                renderItem={({item}) => (
                    <View style={styles.foodItem}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: item.image,
                            }}
                        />
                        <ThemedText variant={"title"} styles={{fontWeight: "bold"}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</ThemedText>
                        <ThemedText>Quantité : {item.quantity}</ThemedText>
                        <ThemedText>Calories : {item.calory}</ThemedText>
                        <ThemedText>Prix: { item.price } €</ThemedText>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                /> : <View style={{flexDirection: "row", justifyContent: "center", marginTop: 15}}>
                        <ThemedText>Vous n'avez aucun aliment pour cette course</ThemedText>
                    </View>}

            { confirmationModal &&  <Confirmation confirmationTitle={"Voulez-vous vraiment supprimer cette course ?"}>
                <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                    <TouchableOpacity style={[styles.confirmationButton, {backgroundColor: colors.red, flex: 1}]} onPress={() => deleteCourse()}>
                        <ThemedText styles={{textAlign: "center"}}>Supprimer</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setConfirmationModal(false)}
                        style={[styles.confirmationButton, {borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)", flex: 1}]}>
                        <ThemedText styles={{textAlign: "center"}}>Annuler</ThemedText>
                    </TouchableOpacity>
                </View>

            </Confirmation>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    foodItem: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.2)",
        flexDirection: "column",
        gap: 10,
        backgroundColor: "white"
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 20,

    },
    foodContainer: {
        marginHorizontal: 20,
        marginTop: 20,

    },
    inputContainer: {
        marginTop: 30,
        marginHorizontal: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 5
    },
    image: {
        width: "auto",
        height: 200,
        resizeMode: 'contain'
    },
    confirmationButton: {
        padding: 10,
        borderRadius: 5,
        textAlign: "center"

    }
});
