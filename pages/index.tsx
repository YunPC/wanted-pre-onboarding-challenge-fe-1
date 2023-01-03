import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline, List } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import AddTodoForm from "../src/components/AddTodoForm";
import ToDoListItem from "../src/components/ToDoListItem";
import TokenLocalStorage from "../utils/localStorage/tokenLocalStorage";

export default function ToDoList() {
  const [toDos, setToDos] = useState<
    {
      title: string;
      content: string;
      id: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  useEffect(() => {
    const tokenStorage = new TokenLocalStorage();
    axios
      .get<{
        data: {
          title: string;
          content: string;
          id: string;
          createdAt: string;
          updatedAt: string;
        }[];
      }>("http://localhost:8080/todos", {
        headers: { Authorization: tokenStorage.getToken() },
      })
      .then((response) => {
        setToDos(response.data.data);
        console.log("response data", response.data.data);
      });
  }, []);

  const theme = createTheme();

  console.log("theme", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ minHeight: "100vh" }}>
        <AddTodoForm />
        <List
          sx={{
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {toDos.map((toDo) => (
            <ToDoListItem key={toDo.id} toDo={toDo} />
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}
