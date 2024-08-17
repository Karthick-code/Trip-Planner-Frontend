import http from "../../utils/http" 
import React, { useState,useEffect } from 'react'
import Destinationdisplay from './Destinationdisplay'
import Loading from './Loading'


const Home = () => {
  const [destinations,setDestinations]=useState([])
  useEffect(()=>{
    try{
    http.get("/destinations")
    .then((ele)=>{console.log(ele.data)
      setDestinations(ele.data);
    })
    
    }
    catch(err){
      console.log(err)
    }
  },[])
  return (
    <>
    <div className="row" style={{display:"flex",flexWrap:"wrap",justifyContent: "space-around"}}>
    {destinations?(destinations.map((data,index)=>{
      
       return (
        <div className="card col-lg-3 col-sm-5" style={{margin:"10px",padding:"10px",border:"1px solid black",borderRadius:"10px"}}>
          <Destinationdisplay data={data} key={index}/>
          </div>
       ) 
      
    })):<div><Loading /> Loading...</div>}
    </div>
    
    
    </>
  )
}

export default Home
