import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import AboutUs from './pages/Home/AboutUs';
import AppointmentPage from './pages/Home/Appointment';
import Dashboard from './pages/Dashboard/dashboard';
import DoctorProfileSetup from './pages/Dashboard/doctor-profile-setup';
import PatientProfileSetup from './pages/Dashboard/patient-profile-setup';
import AuthPage from './pages/Auth/AuthPage';
import Layout from './components/layout'; // Import the Layout component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorProfile from './pages/Doctor/DoctorProfile';
import UserProfile from './pages/Patient/PatientProfile';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes that need the Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorProfile />} />
              <Route path="/patient-dashboard" element={<UserProfile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/appointment" element={<AppointmentPage />} />
             
            </Route>

            {/* AuthPage that doesn't need Layout */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/doctor-profile-setup" element={<DoctorProfileSetup />} />
            <Route path="/patient-profile-setup" element={<PatientProfileSetup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
