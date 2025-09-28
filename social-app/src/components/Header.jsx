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
	ArrowBack as BackIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

import { useLocation, useNavigate } from "react-router";

export default function Header({ count }) {
	const { mode, setMode, setOpenDrawer } = useApp();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<AppBar position="static">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					{pathname == "/" ? (
						<IconButton
							color="inherit"
							onClick={() => {
								setOpenDrawer(true);
							}}>
							<MenuIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => navigate("/")}>
							<BackIcon />
						</IconButton>
					)}
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
