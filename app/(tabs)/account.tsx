import {SafeAreaView} from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "expo-router";

export default function Account({ onLogout }) { // Recevez onLogout comme prop

    const colors = useThemeColors();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            onLogout();  // Appelez onLogout pour mettre à jour l'état token
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={[style.topContainer, { backgroundColor: colors.tint }]}>
                <ThemedText variant={"title"} color={"white"}>Mon compte</ThemedText>
            </View>
            <View>
                <TouchableOpacity style={[style.button, { backgroundColor: colors.tint }]} onPress={logout}>
                    <ThemedText color={"white"} styles={{ textAlign: "center" }}>Se déconnecter</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    topContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
});

