import {Image, StyleSheet, View} from "react-native";
import ThemedText from "@/components/ThemedText";

type Props = {
    title: string,
    number: number,
    image: any

}

export default function StatsCard({title, number, image}: Props)
{
    return (
        <View style={styles.container}>
            <Image source={image}/>
            <ThemedText >{title}</ThemedText>
            <ThemedText variant="title" styles={{fontWeight: "bold"}}>{number}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
        gap: 5,

    }
})