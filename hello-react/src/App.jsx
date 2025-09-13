import { useState } from "react";

import Item from "./Item";
import Header from "./Header";
import Form from "./Form";

import { Container, Divider, List } from "@mui/material";

export default function App() {
	const [data, setData] = useState([
		{ id: 3, name: "Egg", done: true },
		{ id: 2, name: "Bread", done: false },
		{ id: 1, name: "Butter", done: false },
	]);

	const add = name => {
		const id = data[0].id + 1;
		if (name == "") return false;

		setData([{ id, name, done: false }, ...data]);
	};

	const toggle = id => {
		setData(
			data.map(item => {
				if (item.id == id) item.done = !item.done;
				return item;
			})
		);
	};

	const remove = id => {
		setData(data.filter(item => item.id != id));
	};

	return (
		<div>
			<Header />
			<Container maxWidth="sm" sx={{ mt: 4 }}>
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
