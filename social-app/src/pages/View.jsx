import Post from "../components/Post";
import Comment from "../components/Comment";

import { Box, OutlinedInput, Button } from "@mui/material";

export default function View() {
    return (
		<div>
			<Post />
			<Comment />
			<Comment />

			<Box sx={{ paddingBottom: 10 }}>
				<form>
					<OutlinedInput
						multiline
						fullWidth
						sx={{ mb: 1 }}
					/>
					<Box sx={{ textAlign: "right" }}>
						<Button
							type="submit"
							variant="contained">
							Add Comment
						</Button>
					</Box>
				</form>
			</Box>
		</div>
	);
}