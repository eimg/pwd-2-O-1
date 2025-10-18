import { useState } from "react";
import { useApp, queryClient } from "../AppProvider";
import { useParams, useNavigate } from "react-router";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {
    Favorite,
    FavoriteBorder,
    Delete,
    ChatBubbleOutline,
} from "@mui/icons-material";

const api = "http://localhost:8800";

export default function Post({ post, hideActions = false }) {
    const { user } = useApp();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const isDetailView = Boolean(params.id);

    const handleLike = async () => {
        if (!user) return;

        try {
            const isLiked = post.likes.some(like => like.userId === user.id);
            const response = await fetch(`${api}/posts/${post.id}/like`, {
                method: isLiked ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to like/unlike post");
            }

            // Invalidate both posts list and specific post queries
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            if (isDetailView) {
                queryClient.invalidateQueries({ queryKey: ["post", post.id.toString()] });
            }
        } catch (error) {
            console.error("Like error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${api}/posts/${post.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            // Invalidate posts list and redirect if in detail view
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            if (isDetailView) {
                navigate("/");
            }
            setDeleteDialog(false);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };


    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        {post.user.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" component="div">
                            {post.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(post.created).toLocaleString()}
                        </Typography>
                    </Box>
                    {user?.id === post.user.id && (
                        <IconButton
                            color="error"
                            onClick={() => setDeleteDialog(true)}
                        >
                            <Delete />
                        </IconButton>
                    )}
                </Box>

                <Typography variant="body1">
                    {post.content}
                </Typography>
            </CardContent>

            {!hideActions && (
                <CardActions sx={{ px: 2, pb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                                color="error"
                                onClick={handleLike}
                                disabled={!user}
                            >
                                {post.likes.some((like) => like.userId === user?.id) ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                            </IconButton>
                            <Typography color="text.secondary">
                                {post.likes.length}
                            </Typography>
                        </Box>

                        {!isDetailView && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton
                                    color="primary"
                                    onClick={() => navigate(`/view/${post.id}`)}
                                >
                                    <ChatBubbleOutline />
                                </IconButton>
                                <Typography color="text.secondary">
                                    {post.comments.length}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardActions>
            )}

            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this post?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}