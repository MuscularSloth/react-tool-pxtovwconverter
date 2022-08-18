import React, { useContext, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { menuArray } from '../../constants/menuList'
import { sideSwipeableMenuContext } from '../../context/SideSwipeableMenuProvider';

const SideSwipeableMenu = () => {

    // const [isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen] = useState<boolean>(false);
    const {isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen} = useContext(sideSwipeableMenuContext);
    
    const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

        if(typeof setIsSideSwipeableMenuOpen === 'function'){
            setIsSideSwipeableMenuOpen(open);
        }
    };

    const handleMenuItemClick = () =>{
        if(typeof setIsSideSwipeableMenuOpen === 'function'){
            setIsSideSwipeableMenuOpen(false);
        } 
    }

  return (
    <>
        <SwipeableDrawer
            anchor={'left'}
            open={isSideSwipeableMenuOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <List sx={{ width: 250 }}>
				{menuArray.map((menuItem, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton
							component={RouterLink}
							to={menuItem.url}
							disabled={menuItem.disabled}
                            onClick={handleMenuItemClick}
						>
							<ListItemIcon>{menuItem.icon}</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
        </SwipeableDrawer>
    </>
  )
}

export default SideSwipeableMenu