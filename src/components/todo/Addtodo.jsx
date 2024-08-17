import React, { useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import http from "../../../utils/http";
import { useNavigate } from "react-router-dom";
function Addtodo() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const [todo, setTodo] = React.useState({});

  const handleSubmit = () => {
    const todo = {
      title,
      description,
    };
    setTodo(todo);
    
    http.post(`/todo/${user._id}`,todo).then((res) => {
      
      console.log("sucessfully added");
    });
    navigate("/todo");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <form>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </DialogContent>
        </form>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              navigate("/todo");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              handleSubmit();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Addtodo;
