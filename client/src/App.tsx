import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/dashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorProfileUI from './pages/Doctor/profile';
import UserProfilePage from './pages/User/UserPage';



function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor" element={<DoctorProfileUI/>}/>
          <Route path="/User" element={<UserProfilePage/>}/>
         
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;