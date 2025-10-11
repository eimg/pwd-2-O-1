import { ScrollView, View, Text, StyleSheet } from "react-native";

import { Link } from "expo-router";

export default function Card() {
	return (
		<View style={styles.card}>
			<View style={styles.avatar}>
				<Text style={{ color: "white" }}>A</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 18,
						marginTop: 4,
					}}>
					Alice
				</Text>
				<Text style={{ color: "gray", fontSize: 14 }}>
					a few seconds ago
				</Text>
				<Text style={{ fontSize: 14, marginTop: 6 }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Harum nemo voluptates ipsum excepturi quam numquam officiis
					quisquam aspernatur ex.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		gap: 15,
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#66666630",
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
