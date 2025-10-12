import { View, Text, StyleSheet } from "react-native";

import { CommentType } from "@/types/global";

export default function Comment({ comment }: { comment: CommentType }) {
	return (
		<View style={styles.card}>
			<View style={{ flexDirection: "row", gap: 15 }}>
				<View style={styles.avatar}>
					<Text style={{ color: "white" }}>
						{comment.user.name[0]}
					</Text>
				</View>
				<View style={{ flex: 1 }}>
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
