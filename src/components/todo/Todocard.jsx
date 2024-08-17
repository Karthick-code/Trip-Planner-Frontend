import { Card, CardContent, Typography,Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../utils/http";

function Todocard({todo}) {
    const navigate = useNavigate();
    
    const handledelete=()=>{
        try{
            console.log(todo._id)
        http.delete(`/todo/${todo._id}`).then((res)=>{
            console.log(res.data);
            console.log("sucessfully deleted");
        })
        }
        catch(err){
            console.log(err)
        }
    }
    const handleedit=()=>{
        console.log(todo._id);
        console.log("edit")
        navigate(`/edittodo/${todo._id}`);
        
    }
  return (
    <>
    
    <div className="col-md-4 col-sm-5">
        <Card >
            <CardContent> 
                <Typography ><b>Title:</b> {todo.title}</Typography>
                <Typography ><b>Description:</b> {todo.description}</Typography>
                <div className="button">
                    <Button variant="outlined" onClick={handleedit}>Edit</Button>
                    <Button variant="outlined" onClick={handledelete}>Delete</Button>
                </div>
            </CardContent>
        </Card>
    </div>
    </>
    
  );
}

export default Todocard;
