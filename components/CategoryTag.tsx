import ThemedText from "@/components/ThemedText";
import {StyleSheet, View} from "react-native";

type CategoryTagProps = {
    color: string,
    title: string
}

export default function CategoryTag({ color, title }: CategoryTagProps){

    return (
        <View style={[styles.categoryContainer, {backgroundColor: color}]}>
            <ThemedText styles={{textAlign: "center"}}>{title}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        padding: 10,
        borderRadius: 999,
        flex: 1,
        display: "flex",
        justifyContent: "center"
    }
})