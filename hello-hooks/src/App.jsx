import { useState, useEffect, useMemo } from "react";

function someFunction() {
    console.log("Calling someFunction");
    return "some value";
}

export default function App() {
	const [count, setCount] = useState(0);

	const value =useMemo(() => {
        return someFunction();
    }, []);

	return (
		<div>
			Hello Hooks ({count}) <br />
			<br />
			<button onClick={() => setCount(count + 1)}>Increase</button>
            <br />
            <br />
            <span>{value}</span>
		</div>
	);
}
