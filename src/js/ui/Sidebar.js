import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import TabSystem from "./TabSystem"
import MenuIcon from '@material-ui/icons/Menu';
import {Button} from "@material-ui/core";
import './newUI.css';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div style={{display: 'flex', zIndex:2001}}>
            <Button
                id='menuButtonID'
                variant="outlined"
                color="inherit"
                className='menu-button'
                startIcon={<MenuIcon />}
                aria-label="open drawer"
                onClick={() => {
                    setOpen(true);
                    document.getElementById('menuButtonID').style.display = 'none';
                }}
            >
                Menu
            </Button>
            <Drawer
                className='drawer'
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: 'drawer-paper',
                }}
            >
                <TabSystem handleDrawerClose={() => {
                    {
                        setOpen(false);
                        document.getElementById('menuButtonID').style.display = 'flex';
                    }}}/>
            </Drawer>
        </div>
    );
}