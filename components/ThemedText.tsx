import {StyleSheet, Text, TextProps} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";
import {Colors} from "@/constants/Colors";


const style = StyleSheet.create({
    normal: {
        fontSize: 16,
    },
    title: {
        fontSize: 20
    }
})

type Props = TextProps & {
    variant?: keyof typeof style,
    color?: keyof typeof Colors,
    styles?: any
}

export default function ThemedText({variant, color, styles,  ...rest}: Props)
{
    const colors = useThemeColors();
    return <Text {...rest} style={[style[variant ?? 'normal'], styles, { color: colors[color ?? "tint"] }]}/>
}

