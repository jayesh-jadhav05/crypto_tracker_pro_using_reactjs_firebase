import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <h2 className='logo'>CryptoTrackerPro<span style={{ color: "var(--red)" }}>.</span><span style={{ color: "var(--darkgrey)" }}>.</span><span style={{ color: "var(--green)" }}>.</span></h2>
            <div className='social-media-icons'>
                <FacebookRoundedIcon />
                <GitHubIcon />
                <TwitterIcon />
                <InstagramIcon />
            </div>
        </div>
    )
};

export default Footer