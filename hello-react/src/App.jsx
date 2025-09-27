import { useState, useEffect } from "react";

import Item from "./Item";
import Header from "./Header";
import Form from "./Form";

import { Container, Divider, List, Alert } from "@mui/material";

const api = "http://localhost:8800/items";

export default function App() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setIsLoading(true);
		fetch(api)
			.then(res => res.json())
			.then(items => {
				setData(items);
				setIsLoading(false);
			})
            .catch(() => {
                setError("Unable to connect");
                setIsLoading(false);
            });
	}, []);

	const add = async name => {
		const res = await fetch(api, { 
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const item = await res.json();
        setData([...data, item]);
	};

	const toggle = id => {
        fetch(`${api}/${id}/toggle`, { method: "PUT" });

		setData(
			data.map(item => {
				if (item.id == id) item.done = !item.done;
				return item;
			})
		);
	};

	const remove = id => {
        fetch(`${api}/${id}`, { method: "DELETE" });
		setData(data.filter(item => item.id != id));
	};

	return (
		<div>
			<Header count={data.filter(item => !item.done).length} />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<Form add={add} />

				{isLoading && (
					<Alert
						severity="info"
						sx={{ mt: 2 }}>
						Loading...
					</Alert>
				)}

				{error && (
					<Alert
						severity="warning"
						sx={{ mt: 2 }}>
						{error}
					</Alert>
				)}

				<List>
					{data
						.filter(item => item.done == false)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
				<Divider />
				<List>
					{data
						.filter(item => item.done == true)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
			</Container>
		</div>
	);
}
