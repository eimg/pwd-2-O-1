import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PostType, CommentType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp, queryClient } from "@/components/AppProvider";
import Card from "@/components/card";
import Comment from "@/components/comment";
import Ionicons from "@expo/vector-icons/Ionicons";

const api = "http://192.168.1.5:8800/posts";

async function fetchPost(id: string) {
	const res = await fetch(`${api}/${id}`);
	return res.json();
}

const styles = StyleSheet.create({
    commentForm: {
        flexDirection: "row",
        padding: 12,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#66666630",
        backgroundColor: "white",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        maxHeight: 100,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});

export default function Post() {
    const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useApp();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: post, isLoading, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id as string)
    });

    if (error) {
		return (
			<View>
				<Text>{error.message}</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert("Error", "Please enter a comment");
            return;
        }

        if (!user) {
            Alert.alert("Error", "You must be logged in to comment");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("Not authenticated");

            const response = await fetch("http://192.168.1.5:8800/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					content,
					postId: Number(id),
				}),
			});

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.msg || "Failed to add comment");
            }

            setContent("");
            // Invalidate both posts and specific post queries
            queryClient.invalidateQueries({ queryKey: ["post", id] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            Alert.alert("Error", message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1 }}>
                <Card post={post} />
                <View>
                    {post.comments.map((comment: CommentType) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </View>
            </ScrollView>
            
            <View style={styles.commentForm}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                    maxLength={200}
                />
                <TouchableOpacity 
                    style={[
                        styles.button,
                        isSubmitting && styles.buttonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color={isSubmitting ? "#666" : "#007AFF"} 
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
