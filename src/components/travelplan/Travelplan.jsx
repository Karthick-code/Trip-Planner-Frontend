import React from 'react'
import AuthContext from '../../context/AuthContext'
import { useContext ,useState,useEffect} from 'react'
import http from "../../../utils/http";
import { Button } from '@mui/material';
import  { useNavigate } from 'react-router-dom';
// import {Link} from '@mui/material';
import Addtravel from './Addtravel';
import Travelcard from './Travelcard';

function Travelplan() {
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [plans,setPlans]=useState([]);
  useEffect(()=>{
    http.get(`/travelplan/${user._id}`).then((res)=>{
      setPlans(res.data)
    })
  },[])
  return (
    <>
    <div className='row' style={{display:"flex"}}>
    {user?((plans.length!==0)?(
      plans.map((plan)=>{
        return(
          <div>
            <Travelcard plan={plan}/>            
          </div>
        )
      })):(
        <div>
          <h4>No plans found</h4>
          
        </div>
      )
    ):(navigate("/login"))
    
  }
  </div>
  <Button variant='contained' onClick={()=>navigate("/addtravel")}>Add new Travel</Button>
  
  </>
    
  )
}

export default Travelplan