import { useState } from "react";
import { useApp, queryClient } from "../AppProvider";
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    Box,
} from "@mui/material";

const api = "http://localhost:8800";

export default function Form() {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useApp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() || !user) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${api}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            setContent("");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        } catch (error) {
            console.error("Post creation error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <Card sx={{ mb: 2 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <CardContent>
                    <TextField
                        multiline
                        rows={3}
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        fullWidth
                        disabled={isSubmitting}
                    />
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                    >
                        {isSubmitting ? "Posting..." : "Post"}
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}