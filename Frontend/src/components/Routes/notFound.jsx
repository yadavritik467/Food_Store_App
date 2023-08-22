import React from 'react'
import { Link } from 'react-router-dom'
// import {nfp} from '../../../public/'
import "./spin.css"
const NotFound = () => {
  return (
    <div className='nfp'>
   
      <p > opps !! you have visited wrong page<br />
      404 NotFound  <br />
      
      <Link to={"/"} style={{color:"blue",}} >GO BACK</Link>
       </p>
      

    </div>
  )
}

export default NotFound
