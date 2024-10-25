import {FlatList, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors";
import StatsCard from "@/components/StatsCard";
import {useState} from "react";
import FoodCard from "@/components/FoodCard";

type FoodType = {
    name: string;
    quantity: number;
    expiredAt: string;
    type: {
        color: string,
        title: string
    }[];
    image?: string
};

export default function Index() {

    const [searchText, setSearchText] = useState("");

    const colors = useThemeColors();

    const [foods, setFoods] = useState<FoodType[]>([
        {
            name: "Carotte",
            quantity: 4,
            expiredAt: "27/10/2024",
            type: [
                {
                    title: "Légumé",
                    color: "#20BF55"
                },
                {
                    title: "Sain",
                    color: "#20BF55"
                }
            ],
            image: "https://www.primeale.fr/app/uploads/2022/03/primeale-les-carottes-vrac.jpg"
        },
        {
            name: "Tomate",
            quantity: 4,
            expiredAt: "27/10/2024",
            type: [
                {
                    title: "Légumé",
                    color: "#20BF55"
                },
                {
                    title: "Sain",
                    color: "#20BF55"
                }
            ]
        },
        {
            name: "Pomme de terre",
            quantity: 4,
            expiredAt: "27/10/2024",
            type: [
                {
                    title: "Légumé",
                    color: "#20BF55"
                },
                {
                    title: "Sain",
                    color: "#20BF55"
                }
            ]
        },
        {
            name: "Aubergine",
            quantity: 4,
            expiredAt: "27/10/2024",
            type: [
                {
                    title: "Légumé",
                    color: "#20BF55"
                },
                {
                    title: "Sain",
                    color: "#20BF55"
                }
            ]
        },

    ]);

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <SafeAreaView style={{flex: 1}}>
            {/* Top container */}
            <View style={[style.topContainer, {backgroundColor: colors.tint}]}>
                <ThemedText color="white" variant="title">Bonjour, John Doe</ThemedText>
                <ThemedText color="white60">Que voulez-vous faire aujourd'hui ?</ThemedText>
            </View>

            {/* Mes aliments */}
            <View style={[style.bodyContainer, {flex: 1}]}>
                <ThemedText variant="title" styles={{fontWeight: "bold"}}>Mes aliments</ThemedText>
                <View style={style.statContainer}>
                    <StatsCard title="Total d'aliments" number={foods.length} image={require('@/assets/images/carrot.png')} />
                    <StatsCard title="Total d'aliments" number={foods.length} image={require('@/assets/images/carrot.png')} />
                </View>

                {/* Rechercher */}
                <View style={style.inputContainer}>
                    <ThemedText>Rechercher</ThemedText>
                    <TextInput placeholder="Pomme de terre" style={style.input} value={searchText} onChangeText={setSearchText} />
                </View>

                {/* Liste des aliments */}
                <FlatList
                    data={filteredFoods}
                    numColumns={1}
                    contentContainerStyle={{gap: 10, paddingBottom: 20, marginTop: 10}}
                    renderItem={({ item }) => (
                        <FoodCard item={item}  />
                    )}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    topContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    bodyContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    statContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginTop: 20
    },
    inputContainer: {
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 5
    }
})

