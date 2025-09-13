import { useState, useRef } from "react";

import Item from "./Item";
import Header from "./Header";

import { Container } from "@mui/material";

function List({ children }) {
	return (
		<ul style={{ listStyle: "none", padding: 20, background: "#ddf" }}>
			{children}
		</ul>
	);
}

export default function App() {
	const inputRef = useRef();

	const [data, setData] = useState([
		{ id: 3, name: "Egg", done: true },
		{ id: 2, name: "Bread", done: false },
		{ id: 1, name: "Butter", done: false },
	]);

	const add = () => {
		const id = data[0].id + 1;
		const name = inputRef.current.value;
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
				<form
					onSubmit={e => {
						e.preventDefault();
						add();
						e.currentTarget.reset();
					}}>
					<input
						type="text"
						ref={inputRef}
					/>
					<button type="submit">Add</button>
				</form>
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
				<hr />
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
