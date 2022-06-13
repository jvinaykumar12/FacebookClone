import React, { createContext, useReducer } from 'react'

import AuthReducer from './AuthReducer'

export const AuthenicationContext = createContext()
export default function AuthContext({children}) {

    const [state,dispatch] = useReducer(AuthReducer,{user:{
      _id:"629723620002396c9070e19c",
      name:"lotus",
    },isLoading:false,error:null})


  return (
    <AuthenicationContext.Provider value = {{state:state,dispatch:dispatch}}>
      {children}
    </AuthenicationContext.Provider>
  )
}
