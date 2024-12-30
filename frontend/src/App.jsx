import React from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

function App() {
  const [theme, setTheme] = useState('dark')
  const [text, setText] = useState(<MdOutlineLightMode />)
  const [alert, setAlert] = useState(null)
  const [isAunthenticated, setIsAuntheticated] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleMode = () => {
    if (theme === 'dark') {
      setTheme('light')
      setText(<MdOutlineDarkMode />)
      setAlert('success', 'your dark mode is enabled')
    }
    else {
      setTheme('dark')
      setText(<MdOutlineLightMode />)
      setAlert('success', 'your light mode is enabled')
    }
  }

  const handleLogin = (name) => {
    setIsAuntheticated(true);
    setUserName(name);
  }

  const handleLogout = () => {
    setIsAuntheticated(false);
    setUserName('');
    localStorage.removeItem('token');
  }

  return (
    <div className={`bg-${theme}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Home theme={theme} text={text} toggleMode={toggleMode} onLogout={handleLogout} authenticate={isAunthenticated} userName={userName} />} />
          <Route path='/login' element={<Login alert={alert} showAlert={setAlert} onlogin={handleLogin} setUserName={setUserName}/>} />
          <Route path='/signup' element={<Signup alert={alert} showAlert={setAlert} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
