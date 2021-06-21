import React, {useState} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import TabSystem from "./TabSystem"
import MenuIcon from '@material-ui/icons/Menu';
import {Button} from "@material-ui/core";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className='sidebar'>
            <Button
                variant="outlined"
                color="inherit"
                className={clsx('menu-button', open && 'hide')}
                startIcon={<MenuIcon />}
                aria-label="open drawer"
                onClick={() => setOpen(true)}
            >
                Menu
            </Button>
            <Drawer
                className='drawer'
                variant="persistent"
                anchor="left"
                open={open}
                className='drawer-paper'
            >
                <TabSystem handleDrawerClose={() => {setOpen(false)}}/>
            </Drawer>
        </div>
    );
}