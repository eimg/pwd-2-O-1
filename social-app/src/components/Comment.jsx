import { Box, Avatar, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useApp, queryClient } from "../AppProvider";
import { useParams } from "react-router";

const api = "http://localhost:8800";

export default function Comment({ comment }) {
    const { user } = useApp();
    const { id: postId } = useParams();

    const handleDelete = async () => {
        try {
            const response = await fetch(`${api}/comments/${comment.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete comment");
            }

            // Invalidate both posts and specific post queries
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        } catch (error) {
            console.error("Delete comment error:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                p: 2,
                bgcolor: "action.hover",
                borderRadius: 1,
            }}
        >
            <Avatar
                sx={{
                    width: 32,
                    height: 32,
                    fontSize: "1rem",
                    mr: 2,
                    bgcolor: grey[500],
                }}
            >
                {comment.user.name[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        {comment.user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(comment.created).toLocaleString()}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {comment.content}
                </Typography>
            </Box>
            {user?.id === comment.user.id && (
                <IconButton
                    size="small"
                    color="error"
                    onClick={handleDelete}
                >
                    <Delete fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
}
