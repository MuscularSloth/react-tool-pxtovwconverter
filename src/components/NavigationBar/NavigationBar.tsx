import React, { useContext } from "react";
import {
	AppBar,
	Box,
	Container,
	Grid,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from '@mui/icons-material/Menu';
import "./NavigationBar.css";
import { sideSwipeableMenuContext } from "../../context/SideSwipeableMenuProvider";

interface propsTypes {
	title: string;
}

export default function NavigationBar({ title }: propsTypes) {

	const {isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen} = useContext(sideSwipeableMenuContext);

	const handleSwipeableMenuClick = () => {
		if(typeof setIsSideSwipeableMenuOpen === 'function'){
			setIsSideSwipeableMenuOpen(!isSideSwipeableMenuOpen)
		}
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">

				<Toolbar disableGutters>
					<Grid
						style={{
							display: "flex",
							height: "100%",
							width: "100%",
							justifyContent: "space-between",
						}}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleSwipeableMenuClick}
							edge="start"
							sx={{ mr: 2, display:{xs: 'block', lg: 'none'}}}
						>
							<MenuIcon />
						</IconButton>

						<Box>
							<Typography
								variant="h6"
								noWrap
								// component="div"
								// style={{ display: "flex" }}
								pr={2}
								sx={{display: {xs: 'none', md: 'block'}}}
							>
								{title}
							</Typography>
						</Box>
						<Box style={{ textAlign: "right" }}>
							<Link
								className="NavigationBar__link"
								href="https://github.com/MuscularSloth/react-tool-pxtovwconverter"
								target="_blank"
							>
								<GitHubIcon /> GitHub
							</Link>
							<Link
								className="NavigationBar__link"
								href="https://www.linkedin.com/in/konstantin-makar-77b971200/"
								target="_blank"
							>
								<LinkedInIcon /> LinkedIn
							</Link>
						</Box>
					</Grid>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
