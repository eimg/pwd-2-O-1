import {
	IconButton,
	Button,
	ButtonGroup,
	Box,
	Card,
	CardContent,
	Avatar,
	Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";

import {
	FavoriteBorderOutlined as LikeIcon,
	ChatBubble as CommentIcon,
} from "@mui/icons-material";

export default function Post() {
	return (
		<Card sx={{ mb: 2 }}>
			<CardContent sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ width: 64, height: 64, background: green[500] }}>
					A
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }}>Alice</Typography>
					<Typography sx={{ fontSize: "0.8em", color: green[500] }}>
						a few minutes ago
					</Typography>
					<Typography sx={{ mt: 1 }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Cumque architecto, voluptate sapiente omnis rerum
						repudiandae pariatur doloremque quidem nesciunt minima
						esse excepturi, amet ab sed ut ipsam voluptatum repellat
						impedit!
					</Typography>

					<Box
						sx={{
							mt: 2,
							display: "flex",
							justifyContent: "space-around",
						}}>
						<ButtonGroup>
							<IconButton>
								<LikeIcon color="error" />
							</IconButton>
							<Button
								size="small"
								variant="text">
								10
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<IconButton>
								<CommentIcon color="success" />
							</IconButton>
							<Button
								size="small"
								variant="text">
								5
							</Button>
						</ButtonGroup>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
