import {
	createContext,
	useState,
	useContext,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

import { UserType } from "@/types/global";

type AppContextType = {
	user: UserType | null;
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null);

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
