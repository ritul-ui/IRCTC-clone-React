import React  from 'react';
import { useNavigate } from 'react-router-dom';


function Test() {
    const navigate = useNavigate();
  return (
    <div style={{color: "red", backgroundColor : "green", marginTop : "20px"}}>Test
    &nbsp;
    <button onClick={() =>  navigate(-1)}>go back</button>
    </div>
  )
}

export default Test