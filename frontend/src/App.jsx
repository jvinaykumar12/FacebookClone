import './App.css';
import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import { useContext } from 'react';
import { AuthenicationContext } from './context/AuthContext';
import Home from './pages/Home';



function App() {

  const {state}  =  useContext(AuthenicationContext)
  return(
    <>
      <Router>
        <Routes>
          <Route path = "/">
              <Route index element={
                <>
                  {state.user?<Home/>:<Register/>}
                </>
              } />
              <Route path='/login' element={
                <>
                  {state.user?<Navigate replace to = "/" />:<Login/>}
                </>
              } />
              <Route path='/register' element={
                <>
                  {state.user?<Navigate replace to ="/"/>:<Register/>}
                </>
              } />
              <Route path='/profile/:username' element={
                <>
                  {state.user?<Profile/>:<Navigate replace to ="/login"/>}
                </>
              }/>
          </Route>
        </Routes>
      </Router>

    </>
      
   
  )
}

export default App;
