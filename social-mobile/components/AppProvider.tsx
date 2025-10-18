import {
	createContext,
	useState,
	useContext,
	ReactNode,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { ActivityIndicator, View } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types/global";

export const queryClient = new QueryClient();

type AppContextType = {
	user: UserType | null;
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkAuth() {
			try {
				const token = await AsyncStorage.getItem("token");
				if (!token) {
					setIsLoading(false);
					return;
				}

				const response = await fetch("http://192.168.1.5:8800/users/verify", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const userData = await response.json();
					setUser({ ...userData, token });
				} else {
					// Token is invalid, remove it
					await AsyncStorage.removeItem("token");
				}
			} catch (error) {
				console.error("Auto-login failed:", error);
			} finally {
				setIsLoading(false);
			}
		}

		checkAuth();
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#007AFF" />
			</View>
		);
	}

	return (
		<AppContext.Provider value={{ user, setUser }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AppContext.Provider>
	);
}

export function useApp(): AppContextType {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
}
