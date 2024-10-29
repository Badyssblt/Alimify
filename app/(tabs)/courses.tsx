// Courses.js
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";
import { useNavigation } from "expo-router";
import {useFoodContext} from "@/context/FoodContext";

type Course = {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    foodsCount: number
}

interface CoursesProps {
    refreshFoods: () => void;
}

const Courses: React.FC<CoursesProps> = ({ refreshFoods }) => {
    const colors = useThemeColors();
    const [courses, setCourses] = useState<Course[]>([]);

    const navigation = useNavigation();

    const { refetch } = useFoodContext();

    const createCourse = async () => {
        try {
            await axiosInstance.post('/api/courses');
            refetch();
            await getCourses();
        } catch (e) {
            console.log("Erreur lors de la création de la course:", e);
        }
    }

    const getCourses = async () => {
        try {
            const response = await axiosInstance.get("/api/courses");
            setCourses(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.topContainer, { backgroundColor: colors.tint }]}>
                <ThemedText variant="title" color="white">Mes courses</ThemedText>
                <ThemedText color="white60">Ajouter, supprimer et modifier vos éléments</ThemedText>
            </View>

            <Button title="Ajouter une liste de courses" style={styles.button} onPress={createCourse} />

            {/* Liste des courses */}
            { courses.length > 0 ?  <FlatList
                data={courses}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CourseDetail', {id: item.id, refreshCourses: getCourses})}>
                        <View style={styles.courseItem}>
                            <ThemedText variant={"title"} styles={{fontWeight: "bold", marginVertical: 10}}>Course
                                du {new Date(item.createdAt).toLocaleDateString()}</ThemedText>
                            <ThemedText>Nombre d'aliment: <ThemedText
                                styles={{fontWeight: "bold"}}>{item.foodsCount}</ThemedText></ThemedText>
                            <ThemedText style={styles.dateText}>Créé le
                                : {new Date(item.createdAt).toLocaleDateString()}</ThemedText>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            /> : <ThemedText styles={{ textAlign: "center", fontWeight: "bold", marginTop: 30 }}>Vous n'avez aucune course...</ThemedText>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    button: {
        marginTop: 10,
        marginHorizontal: 20
    },
    listContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    courseItem: {
        backgroundColor: "#f8f9fa",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    dateText: {
        fontSize: 12,
        color: "#6c757d",
    },
});

export default Courses;
