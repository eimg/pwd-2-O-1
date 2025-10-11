import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
	return (
		<Tabs
			screenOptions={{
				headerTitle: "Home",
			}}>
			<Tabs.Screen
				name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="home"
								color={color}
								size={24}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="person-circle"
								color={color}
								size={24}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="settings"
								color={color}
								size={24}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
