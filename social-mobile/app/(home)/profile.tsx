import { useState } from "react";

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

import { useApp } from "@/components/AppProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = "http://192.168.1.5:8800";

export default function Profile() {
	const { user, setUser } = useApp();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const login = () => {
		if (!username || !password) {
			return false;
		}

		fetch(`${api}/users/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async res => {
			if (res.ok) {
				const { user, token } = await res.json();
				await AsyncStorage.setItem("token", token);
				setUser(user);
			} else {
				setError("Incorrect username or password");
			}
		});
	};

	return (
		<View style={styles.container}>
			{user ? (
				<View style={{ alignItems: "center", gap: 10 }}>
					<Text style={styles.title}>Profile</Text>
					<Text>{user.name}</Text>
					<TouchableOpacity
						style={styles.logout}
						onPress={() => setUser(null)}>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={{ alignItems: "center" }}>
					<Text style={styles.title}>Login</Text>

					{error && (
						<View
							style={{
								marginVertical: 10,
								alignItems: "center",
							}}>
							<Text style={{ color: "red" }}>{error}</Text>
						</View>
					)}

					<View style={{ flexDirection: "row" }}>
						<TextInput
							autoCapitalize="none"
							style={styles.input}
							value={username}
							onChangeText={setUsername}
							placeholder="username"
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							value={password}
							onChangeText={setPassword}
							placeholder="password"
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={styles.loginButton}
							onPress={login}>
							<Text
								style={{
									color: "white",
									fontWeight: "bold",
									fontSize: 16,
								}}>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
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
	logout: {
		backgroundColor: "red",
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	loginButton: {
		alignItems: "center",
		width: "80%",
		backgroundColor: "green",
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 20,
		marginTop: 10,
	},
	input: {
		width: "80%",
		borderWidth: 1,
		borderColor: "#aaa",
		borderRadius: 5,
		padding: 10,
		fontSize: 15,
		marginTop: 10,
	},
});
