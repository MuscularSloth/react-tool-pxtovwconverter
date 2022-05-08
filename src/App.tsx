//@ts-ignore

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SingleValuePage from "./pages/SingleValuePage/SingleValuePage";
import TextConverterPage from "./pages/TextConverterPage/TextConverterPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

function App() {
	/**
	 *
	 * TODO 10. Implement Typescript
	 * TODO 20. Add color converter
	 * TODO 82. Exclude rows with specific rules (box-shadows, and other if needed)
	 */

	return (
		<>
			<Container
				component="div"
			>
				<NavigationBar />
				<Box>
					<Routes>
						<Route path="/" element={<SingleValuePage />} />
						<Route path="/text-converter" element={<TextConverterPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Box>
			</Container>
		</>
	);
}

export default App;
