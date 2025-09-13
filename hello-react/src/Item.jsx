import { ListItem, ListItemText, IconButton } from "@mui/material";

import { 
    Delete as DeleteIcon,
    SquareOutlined as CheckIcon,
    Check as DoneIcon,
} from "@mui/icons-material";

export default function Item({ item, remove, toggle }) {
	return (
		<ListItem>
			<IconButton onClick={() => toggle(item.id)}>
				{item.done ? (
					<DoneIcon color="success" />
				) : (
					<CheckIcon color="primary" />
				)}
			</IconButton>
			<ListItemText primary={item.name} />
			<IconButton onClick={() => remove(item.id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}
