import {
	Box,
	Card,
	CardContent,
	Avatar,
	Typography,
} from "@mui/material";

import { grey } from "@mui/material/colors";

export default function Post() {
	return (
		<Card sx={{ mb: 2, background: "transparent", border: "1px solid #99999940" }}>
			<CardContent sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ width: 48, height: 48, background: grey[500] }}>
					A
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }}>Alice</Typography>
					<Typography sx={{ fontSize: "0.8em", color: grey[500] }}>
						a few minutes ago
					</Typography>
					<Typography sx={{ mt: 1 }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque architecto.
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
