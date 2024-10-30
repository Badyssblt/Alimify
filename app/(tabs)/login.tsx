import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import React, {useState} from "react";
import {useThemeColors} from "@/hooks/useThemeColors";
import axiosInstance from "@/app/api/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "expo-router";
import {useFoodContext} from "@/context/FoodContext";

export default function Login ()
{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { refetch } = useFoodContext();

    const navigation = useNavigation();

    const login = async () => {
        try {
            const response = await axiosInstance.post('/api/users/login', {
                email: email,
                password: password
            });
            const token = response.data.token.token;
            await AsyncStorage.setItem('token', token);
            refetch();
            navigation.navigate('Home')
        }catch (e) {
            console.log(e)
        }
    }

    const colors = useThemeColors()

    return (
        <SafeAreaView>
            <View style={[styles.topContainer, { backgroundColor: colors.tint }]}>
                <ThemedText variant="title" color="white">Connectez vous</ThemedText>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <View style={styles.inputContainer}>
                    <ThemedText>Email</ThemedText>
                    <TextInput
                        placeholder="johndoe@exemple.com"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <ThemedText>Mot de passe</ThemedText>
                    <TextInput
                        placeholder="*******"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.tint }]} onPress={() => login()}>
                    <ThemedText color={"white"} styles={{textAlign: "center"}}>Se connecter</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5
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
    inputContainer: {
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 5,
    },
});