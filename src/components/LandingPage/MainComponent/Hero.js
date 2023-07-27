import React from 'react'
import './hero.css';
import Button from '../../common/Button/Button';
import iphone from '../../../assets/iphone-img.png'
import gradient from '../../../assets/iphone-gradient.jpg'
import {motion} from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {auth} from '../../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import BasicModal from '../../../Authentication/BasicModal';

const Hero = () => {
    const [user,loading] = useAuthState(auth);

    return (
        <div className='flex-container'>
            <div className='hero-left-data'>
                <motion.h1 className='track-heading' initial={{ opacity:0, y:50}} animate={{ opacity:1, y:0}} transition={{ duration:0.5 }}>Track Crypto</motion.h1>
                <motion.h1 className='real-time-heading' initial={{ opacity:0, y:50}} animate={{ opacity:1, y:0}} transition={{ duration:0.5,delay:0.5 }} >Real Time<span style={{ color: "var(--red)" }}>.</span><span style={{ color: "var(--blue)" }}>.</span><span style={{ color: "var(--green)" }}>.</span></motion.h1>
                <motion.p className='hero-para' initial={{ opacity:0, y:50}} animate={{ opacity:1, y:0}} transition={{ duration:1,delay:1 }}>Track crypto through a public api in real time. visit the dashboard to do so!</motion.p>
                <motion.div className='flex-btns' initial={{ opacity:0, x:50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:1.5}}>
                <NavLink to="https://github.com/jayesh-jadhav05"><Button btnName="Share App" outlinebtn={true} /></NavLink> 
                { user ? <NavLink to="/dashboard"><Button btnName="Dashboard" /></NavLink> : <BasicModal />}
                </motion.div>
            </div>
            <motion.div className='hero-right-data' initial={{ opacity:0, x:50}} animate={{ opacity:1, x:0}} transition={{ duration: 1.8 }}>
            <motion.img src={iphone} alt='iphone' className='iphone-image' initial={{ y:-10}} animate={{ y:10}} transition={{ type: "smooth", repeatType:"mirror", duration:4,repeat:Infinity}}/>
            <img src={gradient} alt='gradient' className='iphone-gradient'/>
            </motion.div>
        </div>
    )
}

export default Hero;