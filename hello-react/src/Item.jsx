export default function Item({ item, remove, toggle }) {
	return (
		<li>
            <button onClick={() => toggle(item.id)}>Check</button>
			{item.name}
			<button onClick={() => remove(item.id)}>Remove</button>
		</li>
	);
}
