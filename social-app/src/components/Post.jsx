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

import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent sx={{ display: "flex", gap: 2 }}>
				<Avatar sx={{ width: 64, height: 64, background: green[500] }}>
					{post.user.name[0]}
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }}>
						{post.user.name}
					</Typography>
					<Typography sx={{ fontSize: "0.8em", color: green[500] }}>
						{post.created}
					</Typography>
					<Typography
						sx={{ mt: 1, cursor: "pointer" }}
						onClick={() => navigate(`/view/${post.id}`)}>
						{post.content}
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
								{post.likes ? post.likes.length : 0}
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<IconButton>
								<CommentIcon color="success" />
							</IconButton>
							<Button
								size="small"
								variant="text">
								{post.comments ? post.comments.length : 0}
							</Button>
						</ButtonGroup>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
