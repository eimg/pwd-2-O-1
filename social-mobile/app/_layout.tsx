import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(home)"
				options={{
					headerShown: false,
                    headerTitle: "Home",
				}}
			/>
			<Stack.Screen
				name="form"
				options={{
					headerTitle: "Form",
				}}
			/>
			<Stack.Screen
				name="post/[id]"
				options={{
					headerTitle: "Post View",
				}}
			/>
		</Stack>
	);
}
