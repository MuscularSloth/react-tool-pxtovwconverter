import React from "react";
import {
	AppBar,
	Box,
	Container,
	Grid,
	Link,
	Toolbar,
	Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./NavigationBar.css";

interface propsTypes {
	title: string;
}

export default function NavigationBar({ title }: propsTypes) {
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
						<Box>
							<Typography
								variant="h6"
								noWrap
								// component="div"
								// style={{ display: "flex" }}
								pr={2}
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
