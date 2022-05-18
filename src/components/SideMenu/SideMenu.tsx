import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArticleIcon from "@mui/icons-material/Article";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { PATH } from "../../constants/path";

const menuArray = [
	{
		name: "PX to VW Single Converter",
		url: PATH.home,
		icon: <AutorenewIcon />,
	},
	{
		name: "PX to VW Text Converter",
		url: PATH.textConverter,
		icon: <ArticleIcon />,
	},
	{
		name: "Color Converter",
		url: PATH.colorConverter,
		icon: <ColorLensIcon />,
	},
];

function SideMenu() {
	return (
		<div>
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					Web Tools
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				{menuArray.map((menuItem, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton component={RouterLink} to={menuItem.url}>
							<ListItemIcon>{menuItem.icon}</ListItemIcon>
							<ListItemText primary={menuItem.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default SideMenu;
