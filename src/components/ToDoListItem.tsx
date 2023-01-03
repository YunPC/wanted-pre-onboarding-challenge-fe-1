import { Clear } from "@mui/icons-material";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";

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
        <Clear fontSize="small" />
      </IconButton>
    </ListItemButton>
  );
}

export default ToDoListItem;
