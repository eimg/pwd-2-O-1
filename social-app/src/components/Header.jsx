import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Badge,
	IconButton,
} from "@mui/material";

import {
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	Menu as MenuIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

export default function Header({ count }) {
	const { mode, setMode, setOpenDrawer } = useApp();

	return (
		<AppBar position="static">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<IconButton color="inherit" onClick={() => {
                        setOpenDrawer(true);
                    }}>
						<MenuIcon />
					</IconButton>
					<Typography>Social</Typography>
				</Box>

				{mode == "dark" ? (
					<IconButton
						color="inherit"
						onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
