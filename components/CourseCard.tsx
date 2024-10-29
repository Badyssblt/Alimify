import {View} from "react-native";
import ThemedText from "@/components/ThemedText";

type CourseProps = {
    title: string,
    date: Date
}

export default function CourseCard({ title }: CourseProps){


    return (
        <View>
            <ThemedText>{title}</ThemedText>
        </View>
    )
}