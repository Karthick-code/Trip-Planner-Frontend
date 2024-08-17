import React from 'react'
import AuthContext from '../../context/AuthContext'
import { useContext,useState } from 'react'
import { Card, Divider } from '@mui/material';
import { TextField ,Button} from '@mui/material';
import http from "../../../utils/http";

function Updateuser() {
  const {user} = useContext(AuthContext);
  const [name,setName]=useState(user.name);
  const [email,setEmail]=useState(user.email);
  const handleSubmit = () => {
    const data = {
      name:name,
      email:email,
    };
    console.log(data);
    http.put(`/user/${user._id}`, data).then((res) => {
      console.log(res.data);
    });
    
  }
  return (
    <>
      {user ? (
        <Card>
          <h1>Update User</h1>
          <form onSubmit={handleSubmit}>
            
          <TextField
                    label="Username"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}>
                </TextField>
                <TextField
                    label="Email"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}>
                </TextField>
            <br />
            <Button variant="contained" type="submit">Update</Button>
          </form>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Updateuser