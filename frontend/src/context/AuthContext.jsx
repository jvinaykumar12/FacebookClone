import axios from 'axios'
import React, { createContext, useEffect, useReducer, useState } from 'react'

import AuthReducer from './AuthReducer'

export const AuthenicationContext = createContext()
export default function AuthContext({children}) {

    const [state,dispatch] = useReducer(AuthReducer,{user:JSON.parse(localStorage.getItem('user'))||null,isLoading:false,error:null})

    const [profile,setProfile] = useState({
      name:"",
      id:"",
      isLoading:false

    })

    useEffect(()=>{
      localStorage.setItem('user',JSON.stringify(state.user))
    },[state.user])
    
  return (
    <AuthenicationContext.Provider value = {{state:state,dispatch:dispatch,profile,setProfile}}>
      {children}
    </AuthenicationContext.Provider>
  )
}
