import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { auth } from '../firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signupsignin.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [signup, setSignup] = useState({username: '', email: '', password: '' });
  const [login,setLogin] = useState({email:'',password:''});

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, signup.email, signup.password); 
      toast.success('Signup Successfully 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      await signOut(auth);
    } catch (error) {
      setSignup({ username: '', email: '', password: '' })
      toast.error('Signup Failed. Please try again. 👎', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    }
    setIsLogin(true);
  };

  const handleLogin = async () => {
    try {
      const loginUser = await signInWithEmailAndPassword(auth, login.email, login.password)
      toast.success('Login Successfully 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      setLogin({email:'',password:''})
      setOpen(false);
    } catch (err) {
      toast.error('Email is Already Be Taken 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      setLogin({email: '', password: '' })
    }
  };

  return (
    <div>
      <div className='outlined-btn' onClick={() => setOpen(true)}>{isLogin ? 'Login' : 'Signup'}</div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <h2 style={{ textAlign: "center",color:"black" }}>{isLogin ? 'Login' : 'Signup'}</h2>
          <hr />
          <div style={{ marginTop: "1.5rem" }}>
            {
              isLogin ? (
                <div className='login'>
                  <input type='email' value={login.email} placeholder='Enter Email' onChange={(e) => setLogin({ ...login, email: e.target.value })} autoComplete='off' />
                  <input type='password' value={login.password} placeholder='Enter Password' onChange={(e) => setLogin({ ...login, password: e.target.value })} autoComplete='off' />
                  <button className='btn' onClick={handleLogin}>Login</button>
                  <h3 style={{ textAlign: "center", margin: 0, padding: 0 }}>OR</h3>
                  <p style={{ margin: 0, padding: 0, textAlign: "center",color:"black" }}>Not a Member? <span style={{ color: "var(--blue)", cursor: "pointer" }} onClick={() => setIsLogin(false)}>Sign us</span></p>
                </div>
              ) : (
                <div className='login'>
                  <input type='text' value={signup.username} placeholder='Enter Username' onChange={(e) => setSignup({ ...signup, username: e.target.value })} />
                  <input type='email' value={signup.email} placeholder='Enter Email' onChange={(e) => setSignup({ ...signup, email: e.target.value })} />
                  <input type='password' value={signup.password} placeholder='Enter Password' onChange={(e) => setSignup({ ...signup, password: e.target.value })} />
                  <button className='btn' onClick={handleSignup}>Signup</button>
                  <h3 style={{ textAlign: "center", margin: 0, padding: 0 }}>OR</h3>
                  <p style={{ margin: 0, padding: 0, textAlign: "center",color:"black" }}>Already a Member? <span style={{ color: "var(--blue)", cursor: "pointer" }} onClick={() => setIsLogin(true)}>Login</span></p>
                </div>
              )
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
}