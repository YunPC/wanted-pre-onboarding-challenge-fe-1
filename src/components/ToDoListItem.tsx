import { Clear, Edit, Save } from "@mui/icons-material";
import {
  IconButton,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TokenLocalStorage from "../../utils/localStorage/tokenLocalStorage";

interface ToDo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ToDoListItemProps {
  toDo: ToDo;
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

function ToDoListItem({ toDo, setToDos }: ToDoListItemProps) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(toDo.title);
  const tokenStorage = new TokenLocalStorage();
  return (
    <>
      {editMode && (
        <>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              if (title !== toDo.title) {
                axios
                  .put<{ data: ToDo }>(
                    `http://localhost:8080/todos/${toDo.id}`,
                    {
                      title,
                      content: toDo.content,
                    },
                    { headers: { Authorization: tokenStorage.getToken() } }
                  )
                  .then((response) => {
                    setToDos((prevToDo) => [
                      ...prevToDo.filter(({ id }) => id !== toDo.id),
                      response.data.data,
                    ]);
                  });
              }
              setEditMode(false);
            }}
          >
            <Save fontSize="small" />
          </IconButton>
        </>
      )}
      {!editMode && (
        <ListItemButton
          role="listitem"
          onClick={() => {
            router.push(`/?selectedId=${toDo.id}`, undefined, {
              shallow: true,
            });
          }}
        >
          <ListItemText>{toDo.title}</ListItemText>
          <IconButton
            color="secondary"
            aria-label="Edit"
            onClick={() => {
              setEditMode(true);
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="secondary" aria-label="Delete">
            <Clear fontSize="small" />
          </IconButton>
        </ListItemButton>
      )}
    </>
  );
}

export default ToDoListItem;
