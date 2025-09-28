import Item from "./Item";
import Header from "./Header";
import Form from "./Form";

import { Container, Divider, List, Alert } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./AppProvider";

const api = "http://localhost:8800/items";

async function fetchItems() {
    const res = await fetch(api);
    return res.json();
}

export default function App() {
	const { data, isLoading, error } = useQuery({
        queryKey: ['items'],
        queryFn: fetchItems,
    });

	const add = async name => {
		await fetch(api, { 
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        queryClient.invalidateQueries(['items']);
	};

	const toggle = async id => {
        await fetch(`${api}/${id}/toggle`, { method: "PUT" });
		queryClient.invalidateQueries(["items"]);
	};

	const remove = async id => {
        await fetch(`${api}/${id}`, { method: "DELETE" });
		queryClient.invalidateQueries(["items"]);
	};

    if(isLoading) {
        return (
			<Alert severity="info" sx={{ mt: 2 }}>
				Loading...
			</Alert>
		);
    }

    if (error) {
		return (
			<Alert severity="warning" sx={{ mt: 2 }}>
				{error}
			</Alert>
		);
	}

	return (
		<div>
			<Header count={data.filter(item => !item.done).length} />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<Form add={add} />

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
