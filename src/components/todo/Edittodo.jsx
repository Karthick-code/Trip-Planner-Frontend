import React, { useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import http from "../../../utils/http";
import { useNavigate, useParams } from "react-router-dom";

function Edittodo() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [open, setOpen] = React.useState(true);
  const [updatedtodo, setUpdatedTodo] = React.useState({});
  const { id } = useParams();

  useEffect(() => {
    //const todoId = window.location.pathname.split("/")[3];
    
    http.get(`/todo/edit/${id}`).then((res) => {
      console.log(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    });
  }, []);
  const handleSubmit = () => {
    const newtodo = {
      title,
      description,
    };
    setUpdatedTodo(newtodo);
    console.log(newtodo);
    http.put(`/todo/${id}`,newtodo).then((res) => {
      console.log(res.data);
      console.log("sucessfully Updated");
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
          <DialogTitle>Edit Todo</DialogTitle>
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Edittodo;
