import React from 'react'
import { useContext } from 'react'
import {authContext} from "../context/AuthContext"


export const useAuthContext = () => {

    const context = useContext(authContext)
    if(!context) {
        throw Error("useAuthContext must be used inside AuthContextProvider")
    }
  return context
}

export default useAuthContext