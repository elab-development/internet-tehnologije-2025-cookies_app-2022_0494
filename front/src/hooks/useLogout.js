
import useAuthContext from "../hooks/useAuthContext"
import React from 'react'

const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () =>{
      dispatch({type:"LOGOUT"})
      localStorage.removeItem("user");  
      window.location.replace("/")
    }
    
  return {logout }
}

export default useLogout