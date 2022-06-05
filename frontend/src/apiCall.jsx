import axios from "axios"

export default function apiCall(userDetails,dispatch) {

    dispatch({type:"LOGIN_START"})
    axios.post("auth/login" , userDetails)
    .then((res)=>{
        dispatch({type:"LOGIN_SUCCESS",payload: res.data})
    }) 
    .catch((err)=>{
        console.log(err.response.data)
        dispatch({type:"LOGIN_FAILURE",payload: err.response.data})
    })

}
