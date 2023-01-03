import { Create, Clear } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";

interface ToDoListItemProps {
  toDo: {
    title: string;
    content: string;
  };
}

function ToDoListItem({ toDo }: ToDoListItemProps) {
  return (
    <ListItemButton role="listitem">
      <ListItemText>{toDo.title}</ListItemText>
      <IconButton color="secondary" aria-label="Delete">
        <Create fontSize="small" />
      </IconButton>
      <IconButton color="secondary" aria-label="Delete">
        <Clear fontSize="small" />
      </IconButton>
    </ListItemButton>
  );
}

export default ToDoListItem;
