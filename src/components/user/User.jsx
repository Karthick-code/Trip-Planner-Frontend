import React, { useContext, useEffect,useState } from 'react'
import  AuthContext  from '../../context/AuthContext';
import { Paper, Typography, Avatar, Button, CardContent,Card } from "@mui/material"
import { Link } from 'react-router-dom';
import http from "../../../utils/http";


function User() {
    const { user, logout } = useContext(AuthContext);
    const [plans,setPlans]=useState([]);
    var expense= 0;
  useEffect(()=>{
    http.get(`/travelplan/${user._id}`).then((res)=>{
      setPlans(res.data)
    })
  },[])
  for(var i=0;i<plans.length;i++){
    expense+=plans[i].budget;
  }
  //alert for expense exceed that the limit
  if(expense>user.expense){
    alert("You have exceeded your expense limit");
  }


    return (
        <>
        <Paper style={{ padding: "16px" }}>
            <Avatar src={user.profilePicture} style={{ width: 60, height: 60, marginBottom: "16px" }} />
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Button variant="contained"  component={Link} to={"/update-user"}> Updateuser </Button>
            <Button onClick={logout} variant="contained" color="secondary"> Logout </Button>
        </Paper>
        <Paper style={{ padding: "16px" }}>
            <Typography variant="h6">My Trips</Typography>
            <Button variant="contained" component={Link} to={"/travelplan"}>My Travelplans </Button>
            <Button variant="contained" component={Link} to={"/addtravel"}>Add new travel</Button>
            <Button variant="contained" component={Link} to={"/todo"}>My Todo</Button>
            <Button variant="contained" component={Link} to={"/travelbooking"}>Book Travel</Button>
        </Paper>
        <Paper >
            <Typography variant="h6">My Expenses</Typography>
            <div className='row'>
                <div className='col-md-6'>
                    <Card style={{ width: "18rem" }}>
                        <CardContent>
                            <Typography variant="h6">Total Expenses</Typography>
                            <Typography variant="body1">{expense}</Typography>
                            <Button variant="contained" component={Link} to={"/expenselimit"}>set Expenses Limit</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Paper>

        
        </>

    )
}

export default User