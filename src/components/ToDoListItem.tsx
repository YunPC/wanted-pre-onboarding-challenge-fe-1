import { Create, Clear } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";

function ToDoListItem() {
  return (
      <List
        sx={{
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        <ListItem role="listitem" button>
          <ListItemIcon>
            <Checkbox tabIndex={-1} disableRipple />
          </ListItemIcon>
          <ListItemText>todo1</ListItemText>
          <IconButton color="secondary" aria-label="Delete">
            <Create fontSize="small" />
          </IconButton>
          <IconButton color="secondary" aria-label="Delete">
            <Clear fontSize="small" />
          </IconButton>
        </ListItem>
      </List>

  );
}

export default ToDoListItem;