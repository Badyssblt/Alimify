// Index.js
import { FlatList, StyleSheet, TextInput, View, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import StatsCard from "@/components/StatsCard";
import useFoods from "@/hooks/useFoods";
import {useEffect, useState} from "react";
import FoodCard from "@/components/FoodCard";
import {useFoodContext} from "@/context/FoodContext";
import axiosInstance from "@/app/api/axiosInstance";

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState();
    const colors = useThemeColors();

    const { foods, courseCount, loading, error, refetch } = useFoodContext();

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const me = async () => {
        try {
            const response = await axiosInstance.get('/api/users/me');
            setUser(response.data)
            console.log(user)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        me()
    }, []);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={[style.topContainer, { backgroundColor: colors.tint }]}>
                    <ThemedText color="white" variant="title">Bonjour, {user &&  user.name }</ThemedText>
                    <ThemedText color="white60">Que voulez-vous faire aujourd'hui ?</ThemedText>
                </View>

                <View style={[style.bodyContainer]}>
                    <ThemedText variant="title" styles={{ fontWeight: "bold" }}>Mes aliments</ThemedText>
                    <View style={style.statContainer}>
                        <StatsCard title="Total d'aliments" number={foods.length}
                                   image={require('@/assets/images/carrot.png')} />
                        <StatsCard title="Nombre de courses" number={courseCount}
                                   image={require('@/assets/images/cart.png')} />
                    </View>

                    {/* Rechercher */}
                    <View style={style.inputContainer}>
                        <ThemedText>Rechercher</ThemedText>
                        <TextInput
                            placeholder="Pomme de terre"
                            style={style.input}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>

                    {/* Liste des aliments */}
                    {loading ? (
                        <ThemedText>Chargement des aliments...</ThemedText>
                    ) : error ? (
                        <ThemedText style={style.errorText}>Erreur: {error.message}</ThemedText>
                    ) : filteredFoods.length > 0 ? (
                        <FlatList
                            data={filteredFoods}
                            numColumns={1}
                            contentContainerStyle={{ gap: 10, marginTop: 10 }}
                            renderItem={({ item }) => (
                                <FoodCard item={item} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    ) : (
                        <ThemedText styles={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }} >Aucun aliment trouvé.</ThemedText>
                    )}

                </View>
            </ScrollView>
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
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 5,
    },
    errorText: {
        color: 'red',
    },
});
