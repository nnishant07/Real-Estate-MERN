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

const App = () => {
  return (
    <Router>
        <div>
          <Routes> 
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/signin' element={<Signin/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
