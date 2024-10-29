import { Image, StyleSheet, Text, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import CategoryTag from "@/components/CategoryTag";
import Button from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import axiosInstance from "@/app/api/axiosInstance";
import {useFoodContext} from "@/context/FoodContext";

type FoodItemProps = {
    item: {
        id: number;
        name: string;
        image: string;
        quantity: number;
        expiredAt: string;
        type?: {   // Rendre `type` optionnel
            color: string;
            title: string;
        }[];
    };
};

export default function FoodCard({ item }: FoodItemProps) {
    const color = useThemeColors();

    const { refetch } = useFoodContext();

    const deleteFood = async () => {
        try {
            const response = await axiosInstance.delete('/api/foods/' + item.id)
            refetch();
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
                <ThemedText variant="title" styles={{ fontWeight: "bold", marginBottom: 10 }}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </ThemedText>
                <ThemedText>Quantité: <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text></ThemedText>
                <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
                    <Button title={"Modifier"} color={"green"} />
                    <Button title={"Supprimer"} color={"red"} onPress={() => deleteFood()}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        backgroundColor: "white"
    },
    categoryContainer: {
        flexDirection: "row",
        gap: 5,
        marginBottom: 60,
    },
    content: {
        marginVertical: 10,
        padding: 30,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
    },
});
