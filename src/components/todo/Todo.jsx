import React from "react";
import { useEffect, useState } from "react";
import http from "../../../utils/http";
import Todocard from "./Todocard";
import { Button } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import {Link} from "@mui/material";

function Todo() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user._id);
    http
      .get(`/todo/${user._id}`) //${user._id}
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="row" style={{justifyContent:"center"}}>
        {(todos.length != 0 )? (
          todos.map((todo, index) => {
            return (
              <>
                <Todocard todo={todo} key={index} />
              </>
            );
          })
        )
             : (
            <h4>No todos yet,Create one:</h4>
        )}
        
      </div>
        <Button variant='contained' href="/addtodo">
        Add Todo
        </Button>
    </>
  );
}

export default Todo;
