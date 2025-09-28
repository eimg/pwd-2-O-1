import { Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Login() {
	return (
		<Box>
			<Typography variant="h3">Login</Typography>
			<form>
				<OutlinedInput
					fullWidth
					placeholder="username"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					type="password"
					fullWidth
					placeholder="password"
					sx={{ mt: 2 }}
				/>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
			</form>
		</Box>
	);
}
