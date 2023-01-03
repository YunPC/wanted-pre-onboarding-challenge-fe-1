import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline, Grid, List } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  const [selectedTodo, setSelectedTodo] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router.query?.selectedId) {
      setSelectedTodo(String(router.query?.selectedId));
    } else {
      setSelectedTodo("");
    }
  }, [router.query?.selectedId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AddTodoForm />
      <Grid container sx={{ width: "80vw" }}>
        <Grid item sx={{ width: "50%" }}>
          <Container sx={{ minHeight: "100vh" }}>
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
        </Grid>
        <Grid item sx={{ width: "50%", backgroundColor: "white" }}>
          <Container sx={{ minHeight: "100vh" }}>
            {selectedTodo !== ""
              ? toDos.find(({ id }) => id === selectedTodo)?.content
              : "메모를 선택해 주세요"}
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
