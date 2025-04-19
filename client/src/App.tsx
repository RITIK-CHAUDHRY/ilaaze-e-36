import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/dashboard';
import DoctorProfileUI from './pages/Doctor/profile';
import UserProfilePage from './pages/User/UserPage';
import AboutUs from './pages/Home/AboutUs';
import AppointmentPage from './pages/Home/Appointment';
import Layout from './components/layout';  

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="doctor" element={<DoctorProfileUI />} />
            <Route path="user" element={<UserProfilePage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="appointment" element={<AppointmentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
