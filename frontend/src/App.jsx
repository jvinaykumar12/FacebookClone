
import {Stack ,Box} from '@mui/material';
import './App.css';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Rightbar from './components/Rightbar';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/profile';
import { useContext } from 'react';
import { AuthenicationContext } from './context/AuthContext';



function App() {

  const {user}  =  useContext(AuthenicationContext)
  return(
    <>
      <Router>
        <Routes>
          <Route path = "/">
              <Route index element={
                <>
                  <Navbar></Navbar>
                  <Home/>
                </>
              } />
              <Route path='login' element={<Login/>}/>
              <Route path='user/:id' element= {
                <Box>
                  <Navbar/>
                  <Stack direction='row' spacing={2} justifyContent='space-between' >
                      <Sidebar/>
                      <Feed/>
                      <Rightbar/>
                  </Stack>
                </Box>
              }/>
              <Route path='profile/:username' element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>

    </>
      
   
  )
}



export default App;
