import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Signup from './Pages/Signup';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
import UpdateListing from './Pages/UpdateListing';

const App = () => {
  return (
    <Router>
        <div>
          <Routes> 
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup'  element={<Signup/>}/>
            <Route path='/about' element={<About/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/create-listing' element={<CreateListing/>}/>
              <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
            </Route>
            
          </Routes>
        </div>
      </Router>
  )
}

export default App
