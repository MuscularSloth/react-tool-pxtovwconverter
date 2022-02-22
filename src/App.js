import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SingleValuePage from "./pages/SingleValuePage/SingleValuePage";
import TextConverterPage from "./pages/TextConverterPage/TextConverterPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Box } from "@mui/system";

function App() {
	/**
	 *
	 * TODO 10. Implement Typescript
	 * TODO 30. Button for reset all custom data  at single page value
	 *
	 * TODO 82. Exclude rows with specific rules (box-shadows, and other if needed)
	 */

	return (
		<>
			<Box
				container
				direction="row"
				justifyContent="center"
				maxWidth={1200}
				margin="auto"
				spacing={2}
			>
				<NavigationBar />
				<Box>
					<Routes>
						<Route path="/" element={<SingleValuePage />} />
						<Route path="/text-converter" element={<TextConverterPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Box>
			</Box>
		</>
	);
}

export default App;
