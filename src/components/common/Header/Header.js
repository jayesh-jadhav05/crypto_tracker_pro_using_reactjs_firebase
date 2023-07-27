import React, { useState } from 'react'
import './header.css';
import TemporaryDrawer from './drawer'
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import SwitchColor from '../Switch/SwitchColor';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';

const Header = () => {
  const [filter, setFilter] = useState(false);
  const [user, loading] = useAuthState(auth);

  const handleColorChange = (colors) => {
    Object.entries(colors).forEach(([variable, color]) => {
      document.documentElement.style.setProperty(variable, color);
    });
  };

  const changeTheme = () => {
    if (filter) {
      toast.success('Dark Theme ON 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    } else {
      toast.success('Light Theme ON 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    }
    setFilter(!filter)
  };

  // User Logout Function
  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success('Logout Successfully 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    } catch (error) {
      toast.error('Logout Failed. Please try again. 👎', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    }
  };

  // Logout Button Style Object
  const logoutBtnStyle = {
    padding: "0.5rem",
    borderRadius: "0.4rem",
    backgroundColor: "var(--blue)",
    color: "var(--white)"
  }

  return (
    <div className='Header'>
      <h2 className='logo'>CryptoTrackerPro<span style={{ color: "var(--red)" }}>.</span><span style={{ color: "var(--blue)" }}>.</span><span style={{ color: "var(--green)" }}>.</span></h2>
      <div className='rightSide'>
        <p className="toggleIcon-head" onClick={changeTheme}><SwitchColor filter={filter} handleColorChange={handleColorChange} /></p>
        <div className='navLinks'>
          <NavLink to="/"><p className='link'>Home</p></NavLink>
          <NavLink to="/compare"><p className='link'>Compare</p></NavLink>
          <NavLink to="/watchlist"><p className='link'>Watchlist</p></NavLink>
          {user && <NavLink to="/dashboard"><Button btnName='Dashboard' /></NavLink>}
        </div>
        <div className='responsive-drawer'>
          <TemporaryDrawer />
        </div>
        {
          user && <Tooltip title="Logout"><LogoutIcon style={logoutBtnStyle} onClick={logOut} /></Tooltip>
        }
        <div>
        </div>
      </div>
    </div>
  )
}

export default Header;