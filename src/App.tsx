import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SingleValuePage from "./pages/SingleValuePage/SingleValuePage";
import TextConverterPage from "./pages/TextConverterPage/TextConverterPage";
import ColorConvertorPage from "./pages/ColorConvertorPage/ColorConvertorPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { PATH } from "./constants/path";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
	/**
	 *
	 * TODO 10. Implement Typescript
	 * TODO 20. Add color converter
	 * TODO 30. Add CSS shadow generator
	 * TODO 40. Add CSS gradient generator
	 * TODO 82. Exclude rows with specific rules (box-shadows, and other if needed)
	 * TODO 999. Add wave/shape generator (need to research)
	 */

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<SideMenu />
				<Container component="div" maxWidth={false}>
					<Box>
						<Routes>
							<Route path={PATH.home} element={<SingleValuePage />} />
							<Route
								path={PATH.textConverter}
								element={<TextConverterPage />}
							/>
							<Route
								path={PATH.colorConverter}
								element={<ColorConvertorPage />}
							/>
							<Route path="*" element={<Navigate to={PATH.home} />} />
						</Routes>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default App;
