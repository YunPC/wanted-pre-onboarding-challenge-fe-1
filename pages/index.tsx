import { ThemeProvider } from "@emotion/react";
import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  List,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import AddTodoForm from "../src/components/AddTodoForm";
import ToDoListItem from "../src/components/ToDoListItem";
import TokenLocalStorage from "../utils/localStorage/tokenLocalStorage";

interface ToDo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default function ToDoList() {
  const router = useRouter();
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
      })
      .catch(() => {
        router.replace("/auth/login");
      });
  }, [router]);

  const theme = createTheme();

  const [selectedTodo, setSelectedTodo] = useState("");

  useEffect(() => {
    if (router.query?.selectedId) {
      setSelectedTodo(String(router.query?.selectedId));
    } else {
      setSelectedTodo("");
    }
  }, [router.query?.selectedId]);

  const debouncedSaveContent = useDebouncedCallback((toDo: ToDo) => {
    axios
      .put<{ data: ToDo }>(
        `http://localhost:8080/todos/${toDo.id}`,
        {
          title: toDo.title,
          content: toDo.content,
        },
        { headers: { Authorization: new TokenLocalStorage().getToken() } }
      )
      .then((response) => {
        setToDos((prevToDo) => [
          ...prevToDo.filter(({ id }) => id !== toDo.id),
          response.data.data,
        ]);
        toast.success("?????? ????????? ?????????????????????.");
      });
  }, 1000);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AddTodoForm setToDos={setToDos} />
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
                  <ToDoListItem key={toDo.id} toDo={toDo} setToDos={setToDos} />
                ))}
              </List>
            </Container>
          </Grid>
          <Grid item sx={{ width: "50%", backgroundColor: "white" }}>
            {selectedTodo === "" && (
              <Container sx={{ minHeight: "100vh" }}>
                ?????? ????????? ????????? ???????????? ??? ?????? ??????????????????
              </Container>
            )}
            {selectedTodo !== "" && (
              <TextField
                inputProps={{ sx: { minHeight: "100vh" } }}
                fullWidth
                multiline
                value={
                  toDos.find(({ id }) => id === selectedTodo)?.content ??
                  "?????? ????????? ????????? ???????????? ??? ?????? ??????????????????"
                }
                onChange={(e) => {
                  const targetTodo = toDos.find(
                    ({ id }) => id === selectedTodo
                  );
                  if (targetTodo === undefined) {
                    return;
                  }
                  const newTodo = { ...targetTodo, content: e.target.value };
                  setToDos((prevTodos) => [
                    ...prevTodos.filter(({ id }) => id !== selectedTodo),
                    newTodo,
                  ]);
                  debouncedSaveContent(newTodo);
                }}
              />
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
