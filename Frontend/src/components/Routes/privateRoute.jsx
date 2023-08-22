import React,{useState,useEffect,} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spiner from './spinner'


const Private = () => {
    const [ok,setOk] = useState(false)
    const [auth]= useAuth()

    useEffect(() => {
      const authCheck = async()=>{
        const res = await axios.get("https://food-backend-zeta.vercel.app/auth/user-auth", {
            headers:{
                "Authorization":auth.token
            }
        })
        if(res.data.ok){
            setOk(true)
        }else{
            setOk(false)
        }
      }
      if(auth.token)authCheck()
    }, [auth.token])
    
  return ok ? <Outlet/> : <Spiner/>
}

export default Private
