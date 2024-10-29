import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, View, ViewStyle} from "react-native";
import ThemedText from "@/components/ThemedText";

type ConfirmationProps = {
    confirmationTitle: string;
    children: any,
}

export default function Confirmation({confirmationTitle, children}: ConfirmationProps){

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{marginHorizontal: 20}}>
                <ThemedText variant={"title"} styles={{fontWeight: "bold", textAlign: "center", marginTop: 40}}>{confirmationTitle}</ThemedText>
                <View >
                    {children}
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
    }
})