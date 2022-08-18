import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";

import { menuArray } from '../../constants/menuList'



function SideMenu() {
	return (
		<Box  sx={{display:{xs: 'none', lg: 'block'}}}>
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
				>
					Web Tools
				</Typography>
			</Toolbar>
			<Divider />
			<List sx={{ width: 250 }}>
				{menuArray.map((menuItem, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton
							component={RouterLink}
							to={menuItem.url}
							disabled={menuItem.disabled}
						>
							<ListItemIcon>{menuItem.icon}</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default SideMenu;
