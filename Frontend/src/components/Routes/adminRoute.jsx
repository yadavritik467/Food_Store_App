// import React,{useState,useEffect,} from 'react'
// import { useAuth } from '../../context/auth'
// import { Outlet } from 'react-router-dom'
// import axios from 'axios'
// import Spiner from './spinner'


// const AdminRoute = () => {
//     const [ok,setOk] = useState(false)
//     const [auth]= useAuth()

    
//       const authCheck = async()=>{
//         const res = await axios.get("/auth/admin-auth", {
//             // headers:{
//             //     "Authorization":auth.token,
                
//             // }
//         })
//         if(res.data.ok){
//             setOk(true)
//         }else{
//             setOk(false)
//         }
//       }
//       useEffect(() => {
//       if(auth?.token)authCheck()
//     }, [auth?.token])
    
//   return ok ? <Outlet/> : <Spiner/>
// }

// export default AdminRoute
