import { useApp } from "./AppProvider";

export default function App() {
    const { count, setCount } = useApp();

	return (
		<div>
			<Header />

			<div style={{ marginTop: 40, textAlign: "center" }}>
				<button onClick={() => setCount(count + 1)}>Increase</button>
			</div>
		</div>
	);
}

function Header() {
	return (
		<div style={{ background: "cyan", padding: 10 }}>
			<Title />
		</div>
	);
}

function Title() {
	return (
		<h1>
			Hello Context <Badge />
		</h1>
	);
}

function Badge() {
    const { count } = useApp();

	return (
		<span
			style={{
				marginLeft: 10,
				background: "red",
				color: "white",
				padding: "2px 10px",
				borderRadius: 20,
			}}>
			{count}
		</span>
	);
}
