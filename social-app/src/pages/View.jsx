import Post from "../components/Post";
import Comment from "../components/Comment";

import { Box, OutlinedInput, Button } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const api = "http://localhost:8800";

async function fetchPost(id) {
	const res = await fetch(`${api}/posts/${id}`);
	return res.json();
}

export default function View() {
	const { id } = useParams();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<Post post={post} />
			{post.comments.map(comment => {
				return (
					<Comment
						key={comment.id}
						comment={comment}
					/>
				);
			})}

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
