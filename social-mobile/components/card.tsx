import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { PostType } from "@/types/global";
import { useApp, queryClient } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Card({ post }: { post: PostType }) {
    const { user } = useApp();

    const handleDelete = async () => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("token");
                            if (!token) throw new Error("Not authenticated");

                            const response = await fetch(`http://192.168.1.5:8800/posts/${post.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                },
                            });

                            if (!response.ok) {
                                throw new Error("Failed to delete post");
                            }

                            queryClient.invalidateQueries({ queryKey: ["posts"] });
                        } catch (error) {
                            const message = error instanceof Error ? error.message : "Something went wrong";
                            Alert.alert("Error", message);
                        }
                    },
                },
            ]
        );
    };
	return (
		<View style={styles.card}>
			<View style={{ flexDirection: "row", gap: 15 }}>
				<View style={styles.avatar}>
					<Text style={{ color: "white" }}>{post.user.name[0]}</Text>
				</View>
				<View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    marginTop: 4,
                                }}>
                                {post.user.name}
                            </Text>
                            <Text style={{ color: "gray", fontSize: 14 }}>
                                {post.created}
                            </Text>
                        </View>
                        {user?.id === post.user.id && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Ionicons name="trash-outline" size={20} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
					<TouchableOpacity
						onPress={() => {
							router.push(`/post/${post.id}`);
						}}>
						<Text
							style={{
								fontSize: 15,
								marginTop: 6,
								color: "#222",
							}}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					marginTop: 15,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					<TouchableOpacity
						onPress={async () => {
							if (!user) {
								Alert.alert("Error", "You must be logged in to like posts");
								return;
							}

							try {
								const token = await AsyncStorage.getItem("token");
								if (!token) throw new Error("Not authenticated");

								const isLiked = post.likes.some(like => like.userId === user.id);
								const response = await fetch(
									`http://192.168.1.5:8800/posts/${post.id}/like`,
									{
										method: isLiked ? "DELETE" : "POST",
										headers: {
											Authorization: `Bearer ${token}`,
										},
									}
								);

								if (!response.ok) {
									throw new Error(isLiked ? "Failed to unlike" : "Failed to like");
								}

								// Invalidate both posts and specific post queries if we're on the post view
								queryClient.invalidateQueries({ queryKey: ["posts"] });
								queryClient.invalidateQueries({ queryKey: ["post", post.id.toString()] });
							} catch (error) {
								const message = error instanceof Error ? error.message : "Something went wrong";
								Alert.alert("Error", message);
							}
						}}
					>
						<Ionicons
							name={post.likes.some(like => like.userId === user?.id) ? "heart" : "heart-outline"}
							color="red"
							size={24}
						/>
					</TouchableOpacity>
					<Text style={{ color: "#666" }}>{post.likes.length}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					<TouchableOpacity
						onPress={() => {
							router.push(`/post/${post.id}`);
						}}>
						<Ionicons
							name="chatbubble-outline"
							color="green"
							size={24}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							router.push(`/post/${post.id}`);
						}}>
						<Text>{post.comments.length}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#66666630",
		backgroundColor: "white",
	},
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 64,
		backgroundColor: "deeppink",
		alignItems: "center",
		justifyContent: "center",
	},
});
