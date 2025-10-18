import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useApp, queryClient } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Form() {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useApp();

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert("Error", "Please enter post content");
            return;
        }

        if (!user) {
            Alert.alert("Error", "You must be logged in to create a post");
            return;
        }

        setIsLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            
            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await fetch("http://localhost:8800/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Failed to create post");
            }

            // Invalidate and refetch posts query
            queryClient.invalidateQueries({ queryKey: ["posts"] });
    
            router.replace("/(home)");
            
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            Alert.alert("Error", message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Post</Text>
            
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                />

                <TouchableOpacity 
                    style={[
                        styles.button,
                        isLoading && styles.buttonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Posting..." : "Post"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    form: {
        gap: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});