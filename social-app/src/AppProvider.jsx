import { createContext, useContext, useState, useMemo } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const AppContext = createContext();

export const queryClient = new QueryClient();

export default function AppProvider({ children }) {
	const [mode, setMode] = useState("dark");
	const [openDrawer, setOpenDrawer] = useState(false);
	const [user, setUser] = useState();

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode: mode,
			},
		});
	}, [mode]);

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer, user, setUser }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					{children}
					<CssBaseline />
				</ThemeProvider>
			</QueryClientProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
