import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CommentType } from "@/types/global";
import { useApp, queryClient } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Comment({ comment }: { comment: CommentType }) {
    const { user } = useApp();

    const handleDelete = async () => {
        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete this comment?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("token");
                            if (!token) throw new Error("Not authenticated");

                            const response = await fetch(
								`http://192.168.1.5:8800/comments/${comment.id}`,
								{
									method: "DELETE",
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							);

                            if (!response.ok) {
                                throw new Error("Failed to delete comment");
                            }

                            // Invalidate the specific post query
                            queryClient.invalidateQueries({ queryKey: ["post", comment.postId.toString()] });
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
					<Text style={{ color: "white" }}>
						{comment.user.name[0]}
					</Text>
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
                                {comment.user.name}
                            </Text>
                            <Text style={{ color: "gray", fontSize: 14 }}>
                                {comment.created}
                            </Text>
                        </View>
                        {user?.id === comment.user.id && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Ionicons name="trash-outline" size={18} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
					<Text
						style={{
							fontSize: 14,
							marginTop: 6,
							color: "#222",
						}}>
						{comment.content}
					</Text>
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
        backgroundColor: "#eee",
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 48,
		backgroundColor: "gray",
		alignItems: "center",
		justifyContent: "center",
	},
});
