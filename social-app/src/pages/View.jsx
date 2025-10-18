import { useState } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { Box, OutlinedInput, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useApp, queryClient } from "../AppProvider";

const api = "http://localhost:8800";

async function fetchPost(id) {
	const res = await fetch(`${api}/posts/${id}`);
	return res.json();
}

export default function View() {
	const { id } = useParams();
	const { user } = useApp();
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleComment = async (e) => {
		e.preventDefault();
		if (!comment.trim() || !user) return;

		setIsSubmitting(true);

		try {
			const response = await fetch(`${api}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					content: comment,
					postId: Number(id),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add comment");
			}

			setComment("");
			queryClient.invalidateQueries({ queryKey: ["post", id] });
		} catch (error) {
			console.error("Comment error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

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

			{user && (
				<Box sx={{ paddingBottom: 10 }}>
					<Box component="form" onSubmit={handleComment}>
						<OutlinedInput
							multiline
							fullWidth
							sx={{ mb: 1 }}
							placeholder="Write a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							disabled={isSubmitting}
						/>
						<Box sx={{ textAlign: "right" }}>
							<Button
								type="submit"
								variant="contained"
								disabled={!comment.trim() || isSubmitting}
							>
								{isSubmitting ? "Posting..." : "Add Comment"}
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</div>
	);
}
