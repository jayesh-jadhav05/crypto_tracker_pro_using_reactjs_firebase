import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import Button from '../Button/Button'
import { NavLink } from 'react-router-dom';

export default function TemporaryDrawer() {

    const [open, setOpen] = useState(false);

    return (
        <div>

            <IconButton onClick={() => setOpen(true)}><MenuRoundedIcon className='link' /></IconButton>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className='mobile-view'>
                    <NavLink to="/">
                        <p className='link'>Home</p>
                    </NavLink>
                    <NavLink to="/compare">
                        <p className='link'>Compare</p>
                    </NavLink>
                    <NavLink to="/watchlist">
                        <p className='link'>Watchlist</p>
                    </NavLink>
                    <NavLink to="dashboard">
                        <Button btnName="Dashboard" />
                    </NavLink>
                </div>
            </Drawer>
        </div>
    );
}