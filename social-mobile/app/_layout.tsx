import AppProvider from "@/components/AppProvider";

import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AppProvider>
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
                        presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="post/[id]"
					options={{
						headerTitle: "Post View",
					}}
				/>
			</Stack>
		</AppProvider>
	);
}
