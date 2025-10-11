import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Post() {
    const { id } = useLocalSearchParams();

    return <View style={styles.container}>
        <Text style={styles.title}>Post</Text>
        <Text>Post View - {id}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});