import React, { createContext, useReducer } from 'react'

import AuthReducer from './AuthReducer'

export const AuthenicationContext = createContext()
export default function AuthContext({children}) {

    const [state,dispatch] = useReducer(AuthReducer,{user:null,isLoading:false,error:null})


  return (
    <AuthenicationContext.Provider value = {{state:state,dispatch:dispatch}}>
      {children}
    </AuthenicationContext.Provider>
  )
}
