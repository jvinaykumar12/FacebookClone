import React from 'react'

export default function AuthReducer(state,action) {

    switch (action.type) {
        
        case 'LOGIN_START' :
            return {
                user : null,
                isLoading : true,
                error : false,
            }
        case 'LOGIN_SUCCESS' :
            return {
                user : action.payload,
                isLoading : false,
                error : false
            }
        case 'LOGIN_FAILURE' :
            return {
                user : null,
                isLoading : false,
                error : action.payload
            }
        case 'LOG_OUT' :
            return {
                user:null,
                isLoading : false,
                error : false
            }
        default:
            return state
    }
    
}
