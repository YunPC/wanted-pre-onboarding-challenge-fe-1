import { InputBase, Button } from "@mui/material";

function AddTodoForm() {
  return (
    <div>
      <form style={{ display: "flex", margin: 10 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="TODO"
          inputProps={{
            "aria-label": "Description",
          }}
          style={{ width: "90%" }}
          required
        />
        <Button type="submit" variant="text" style={{ width: "10%" }}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddTodoForm;
