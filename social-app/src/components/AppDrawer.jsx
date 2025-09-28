import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	Divider,
} from "@mui/material";

import {
	Home as HomeIcon,
	Person as ProfileIcon,
	PersonAdd as RegisterIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";

import { grey } from "@mui/material/colors";
import { useApp } from "../AppProvider";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer, user, setUser } = useApp();

	return (
		<Drawer
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}>
			<Box sx={{ height: 200, width: 240, background: grey[500] }}></Box>
			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<Divider />

				{user && (
					<>
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<ProfileIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton onClick={() => setUser(undefined)}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</>
				)}

				{!user && (
					<>
						<ListItem>
							<ListItemButton
								onClick={() => setUser({ name: "Alice" })}>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="Login" />
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<RegisterIcon />
								</ListItemIcon>
								<ListItemText primary="Register" />
							</ListItemButton>
						</ListItem>
					</>
				)}
			</List>
		</Drawer>
	);
}
