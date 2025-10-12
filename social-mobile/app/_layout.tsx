import { Stack } from "expo-router";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}
