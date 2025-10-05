import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";

export default function Comment({ comment }) {
	return (
		<Card
			sx={{
				mb: 2,
				background: "transparent",
				border: "1px solid #99999940",
			}}>
			<CardContent sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ width: 48, height: 48, background: grey[500] }}>
					{comment.user.name[0]}
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }}>
						{comment.user.name}
					</Typography>
					<Typography sx={{ fontSize: "0.8em", color: grey[500] }}>
						{comment.created}
					</Typography>
					<Typography sx={{ mt: 1 }}>{comment.content}</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
