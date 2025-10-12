import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";
import { PostType } from "@/types/global";

export default function Card({ post }: { post: PostType }) {
	return (
		<View style={styles.card}>
			<View style={{ flexDirection: "row", gap: 15 }}>
				<View style={styles.avatar}>
					<Text style={{ color: "white" }}>{post.user.name[0]}</Text>
				</View>
				<View style={{ flex: 1 }}>
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
					<TouchableOpacity>
						<Ionicons
							name="heart-outline"
							color="red"
							size={24}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>{post.likes.length}</Text>
					</TouchableOpacity>
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
