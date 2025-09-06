function Element(props) {
	return <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
        <li>Item Four</li>
    </ul>;
}

ReactDOM.render(
	<Element content="A React Component" />,
	document.getElementById("app")
);
