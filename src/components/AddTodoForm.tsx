import { InputBase, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import TokenLocalStorage from "../../utils/localStorage/tokenLocalStorage";

function AddTodoForm() {
  const [ToDo, setTodo] = useState({ title: "", content: "" });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tokenStorage = new TokenLocalStorage();
    axios
      .post(
        "http://localhost:8080/todos",
        {
          ...ToDo,
        },
        { headers: { Authorization: tokenStorage.getToken() } }
      )
      .then((value) => {
        console.log("value", value);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", margin: 10 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Title"
          inputProps={{
            "aria-label": "Todo Title",
          }}
          style={{ width: "90%" }}
          required
          onChange={(e) => {
            setTodo((prevTodo) => ({ ...prevTodo, title: e.target.value }));
          }}
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Content"
          inputProps={{
            "aria-label": "Todo Content",
          }}
          style={{ width: "90%" }}
          required
          onChange={(e) => {
            setTodo((prevTodo) => ({ ...prevTodo, content: e.target.value }));
          }}
        />
        <Button type="submit" variant="text" style={{ width: "10%" }}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddTodoForm;
