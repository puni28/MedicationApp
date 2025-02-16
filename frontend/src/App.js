import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Schedule from './components/Schedule/Schedule';
// import ScheduleDetail from './components/Schedule/ScheduleDetail';
// import ScheduleHistory from './components/Schedule/ScheduleHistory';
import MedicationList from './components/Medication/MedicationList';
import MedicationForm from './components/Medication/MedicationForm';
import MedicationHistory from './components/Tracking/MedicationHistory';
import MedicationDetail from './components/Medication/MedicationDetail';
import RefillManager from './components/Tracking/RefillManager';
import SymptomTracker from './components/Tracking/SymptomTracker';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Recommendation from './components/Recommendation/Recommendation';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationAlerts from './components/NotificationAlerts/NotificationAlerts';
function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <Routes>      
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/medications" element={<MedicationList />} />
      <Route path="/medications/add" element={<MedicationForm />} />
      <Route path="/medications/:id" element={<MedicationDetail />} />
      <Route path="/history" element={<MedicationHistory />} />
      <Route path="/refills" element={<RefillManager />} />
      <Route path="/symptoms" element={<SymptomTracker />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/notification-alerts" element={<NotificationAlerts />} />
    </Routes>
  );
}

function Logout() {
  const { logout } = useAuth();

  // Call logout and navigate to login page
  const handleLogout = () => {
    logout(); // Call the logout function
  };

  // Render a button for logging out
  return <button onClick={handleLogout}>Logout</button>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
