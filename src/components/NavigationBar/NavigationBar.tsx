import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import "./NavigationBar.css";

interface propsTypes {
	title: string;
}

export default function NavigationBar({ title }: propsTypes) {
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						style={{ display: "flex" }}
						pr={2}
					>
						{title}
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
