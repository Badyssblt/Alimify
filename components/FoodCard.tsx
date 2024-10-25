import {Image, StyleSheet, Text, View} from "react-native";
import ThemedText from "@/components/ThemedText";
import CategoryTag from "@/components/CategoryTag";
import Button from "@/components/Button";
import {useThemeColors} from "@/hooks/useThemeColors";

type FoodItemProps = {
    item: {
        name: string,
        image: string,
        quantity: number,
        expiredAt: string,
        type: {
            color: string,
            title: string
        }[]
    }
}


export default function FoodCard({ item }: FoodItemProps) {

    const color = useThemeColors();

    return (
        <View style={styles.container}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <View style={styles.content}>
                <ThemedText variant="title" styles={{fontWeight: "bold", marginVertical: 10}}>{item.name}</ThemedText>
                <View style={styles.categoryContainer}>
                    {item.type.map((category, index) => (
                        <CategoryTag key={index} color={category.color} title={category.title} />
                    ))}
                </View>
                <View>
                    <View>
                        <ThemedText>Expire le: <Text style={{fontWeight: "bold"}}>{item.expiredAt}</Text></ThemedText>
                    </View>
                </View>
                <ThemedText>Quantité: <Text style={{fontWeight: "bold"}}>{item.quantity}</Text></ThemedText>
                <View style={{flexDirection: "column", gap: 10}}>
                    <Button title={"Modifier"} color={"green"}/>
                    <Button title={"Supprimer"} color={"red"}/>
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
    },
    categoryContainer: {
        flexDirection: "row",
        gap: 5,
        marginBottom: 60
    },
    content: {
        marginVertical: 10,
        padding: 30
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
    },
});
