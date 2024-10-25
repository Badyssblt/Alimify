import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";

type ColorKey = keyof typeof Colors;

type Props = {
    onPress?: () => void;
    title: string;
    color?: ColorKey;
    style?: ViewStyle;
}

export default function Button({ onPress, title, color = "green", style }: Props) {
    const themeColors = useThemeColors();

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: themeColors[color] }, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
