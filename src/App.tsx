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
import GradientGeneratorPage from "./pages/GradientGeneratorPage/GradientGeneratorPage";

function App() {
	/**
	 *
	 * TODO 01. Renew App Title+, README file+ and images
	 * TODO 02. App: Refactor TS Props in RCs whole project
	 * TODO 10. App: Implement Error Boundry
	 * TODO 11. PX to VW Text: Add an min max option to limits vw convertation
	 * TODO 12. PX to VW Text: Add option exclude from result rows without convertation
	 * TODO 50. Add a LTR / RTL convertor
	 * TODP 60. App: Refactor the visual, add adaptive
	 * TODO 70. Add ratio/margin calculator
	 * TODO 80. Add Regex drag&drop generator
	 * TODO 82. PX to VW Text: Exclude rows with specific rules (box-shadows, and other if needed)
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
							<Route
								path={PATH.gradientGenerator}
								element={<GradientGeneratorPage />}
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
