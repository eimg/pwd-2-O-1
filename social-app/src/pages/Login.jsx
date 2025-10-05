import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";

const api = "http://localhost:8800";

export default function Login() {
	const navigate = useNavigate();
	const { setUser } = useApp();

	const [error, setError] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async data => {
		const res = await fetch(`${api}/users/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const { user, token } = await res.json();
			localStorage.setItem("token", token);

			setUser(user);
			navigate("/");
		} else {
			setError("username or password incorrect");
		}
	};

	return (
		<Box>
			<Typography variant="h3">Login</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					fullWidth
					placeholder="username"
					sx={{ mt: 2 }}
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography color="error">username is required</Typography>
				)}

				<OutlinedInput
					type="password"
					fullWidth
					placeholder="password"
					sx={{ mt: 2 }}
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<Typography color="error">password is required</Typography>
				)}

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 2 }}>
					Login
				</Button>
			</form>
		</Box>
	);
}
