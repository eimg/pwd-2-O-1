import { Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Register() {
	return (
		<Box>
			<Typography variant="h3">Register</Typography>
			<form>
				<OutlinedInput
					fullWidth
					placeholder="name"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="username"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="bio"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					type="password"
					fullWidth
					placeholder="password"
					sx={{ mt: 2 }}
				/>
				<Button
					fullWidth
					variant="contained"
					sx={{ mt: 2 }}>
					Register
				</Button>
			</form>
		</Box>
	);
}
