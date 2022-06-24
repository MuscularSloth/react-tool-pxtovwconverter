import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SingleValuePage from "./pages/SingleValuePage/SingleValuePage";
import TextConverterPage from "./pages/TextConverterPage/TextConverterPage";
import ColorConvertorPage from "./pages/ColorConvertorPage/ColorConvertorPage";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { PATH } from "./constants/path";
import SideMenu from "./components/SideMenu/SideMenu";
import ShadowGeneratorPage from "./pages/ShadowGeneratorPage/ShadowGeneratorPage";

function App() {
	/**
	 *
	 * TODO 01. Add a link to the git and the linkedin
	 * TODO 02. Refactor TS Props in RCs whole project
	 * TODO 10. Implement Typescript
	 * TODO 11. Add an min max option to limits vw convertation
	 * TODO 30. Add a CSS Text shadow generator
	 * TODO 40. Add a CSS gradient generator
	 * TODO 50. Add a LTR / RTL convertor
	 * TODP 60. Refactor the visual
	 * TODO 70. Add ratio/margin ratio generator
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
							<Route
								path={PATH.shadowGenerator}
								element={<ShadowGeneratorPage />}
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
