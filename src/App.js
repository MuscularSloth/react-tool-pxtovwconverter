import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SingleValuePage from './pages/SingleValuePage/SingleValuePage';
import TextConverterPage from './pages/TextConverterPage/TextConverterPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Box } from '@mui/system';






function App() {

  /**
   * +TODO 10. Delete Table Values
   * TODO 11. DragDrop Table Values at single page value
   * TODO 20. Localstore all custom data  at single page value
   * TODO 30. Button for reset all custom data  at single page value
   * 
   * +TODO 40. Text convertation page
   * +TODO 50. Add Routes or tabs
   * +TODO 60. Add navbar
   * +TODO 70. Add text convertation logic
   * +TODO 80. Add options to text convertation:
   * +TODO 81. Exclude rows when value less than 5px
   * TODO 82. Exclude rows with specific rules (box-shadows, and other if needed)
   * +TODO 90. Drag & Drop file to convert
   * +TODO 91. Check extensions
   * +TODO 100. Clear all texareas button
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
