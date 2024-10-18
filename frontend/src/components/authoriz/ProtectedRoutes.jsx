import { useContext, useState} from "react";
import { ProfileContext } from "../context/ProfileContextProvider";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const {userInfo} = useContext(ProfileContext)
    console.log(userInfo)
    
    return ( 
        userInfo?.whoIs.type === 'admin' ? <Outlet/> : <Navigate to='/'/>
    )
}

export default ProtectedRoutes