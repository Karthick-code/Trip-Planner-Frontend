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
import { useNavigate } from "react-router-dom"

function Expenselimit() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [limit, setLimit] = React.useState(0);
  const [open, setOpen] = React.useState(true);

  const handleSubmit = () => {
    const data={
        name:user.name,
        email:user.email,
        expense:limit
    }
    console.log(data);
    http.put(`/user/${user._id}`,data).then((res) => {
      console.log(res.data);
      console.log("sucessfully updated");
    });
    navigate("/user");
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
          <DialogTitle>Add Expense limit</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="limit"
              type="text"
              fullWidth
              variant="standard"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
            
          </DialogContent>
        </form>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              navigate("/user");
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
            Add limit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Expenselimit;
