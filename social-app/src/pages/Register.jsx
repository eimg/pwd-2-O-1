import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const api = "http://localhost:8800";

export default function Register() {
    const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async data => {
        const res = await fetch(`${api}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(res.status === 201) {
            return navigate("/login");
        }

        console.log(data);
    };

	return (
		<Box>
			<Typography variant="h3">Register</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					fullWidth
					placeholder="name"
					sx={{ mt: 2 }}
					{...register("name", { required: true })}
				/>
				{errors.name && (
					<Typography color="error">name is required</Typography>
				)}

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
					fullWidth
					placeholder="bio"
					sx={{ mt: 2 }}
					{...register("bio")}
				/>
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
					Register
				</Button>
			</form>
		</Box>
	);
}
