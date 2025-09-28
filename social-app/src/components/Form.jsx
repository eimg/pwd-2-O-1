import { Box, Button, OutlinedInput } from "@mui/material";

export default function Form() {
    return (
		<Box sx={{ mb: 2 }}>
			<form>
				<OutlinedInput
					multiline
					fullWidth
                    placeholder="What's on your mind..."
				/>
				<Box sx={{ textAlign: "right", mt: 1 }}>
					<Button variant="contained" type="submit">Add Post</Button>
				</Box>
			</form>
		</Box>
	);
}