import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
    return <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text>User Profile</Text>
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