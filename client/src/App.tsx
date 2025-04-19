import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/Home/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorProfileUI from './pages/Doctor/profile';
import UserProfilePage from './pages/User/UserPage';
import AboutUs from './pages/Home/AboutUs';
import AppointmentPage from './pages/Home/Appointment';
import Dashboard from './pages/Dashboard/dashboard';
import DoctorProfileSetup from './pages/Dashboard/doctor-profile-setup';
import PatientProfileSetup from './pages/Dashboard/patient-profile-setup';
import AuthPage from './pages/Auth/AuthPage';
import Layout from './components/layout';  

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-dashboard" element={<Dashboard />} />
          <Route path="/patient-dashboard" element={<Dashboard />} />
          <Route path="/doctor" element={<DoctorProfileUI/>}/>
          <Route path="/User" element={<UserProfilePage/>}/>
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/appointment" element={<AppointmentPage/>} />
          <Route path="/doctor-profile-setup" element={<DoctorProfileSetup /> } />
          <Route path="/patient-profile-setup" element={<PatientProfileSetup /> } />
          <Route path="/auth" element={<AuthPage /> } /> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
