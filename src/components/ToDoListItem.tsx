import { Clear } from "@mui/icons-material";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface ToDoListItemProps {
  toDo: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

function ToDoListItem({ toDo }: ToDoListItemProps) {
  const router = useRouter();
  return (
    <ListItemButton
      role="listitem"
      onClick={() => {
        router.push(`/?selectedId=${toDo.id}`, undefined, { shallow: true });
      }}
    >
      <ListItemText>{toDo.title}</ListItemText>
      <IconButton color="secondary" aria-label="Delete">
        <Clear fontSize="small" />
      </IconButton>
    </ListItemButton>
  );
}

export default ToDoListItem;
