import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import useAuth from './hooks/useAuth';
import Auth from './pages/Auth/Auth';
import DentistDashboard from './pages/DentistDashboard/DentistDashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  const { user } = useAuth();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
      console.log(userRole);
    }
  }, [user]);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Hero />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<ProtectedRoute role='patient' />}>
                <Route
                  path='/patient-dashboard'
                  element={<PatientDashboard />}
                />
              </Route>
              <Route element={<ProtectedRoute role='dentist' />}>
                <Route
                  path='/dentist-dashboard'
                  element={<DentistDashboard />}
                />
              </Route>
            </Route>
          </Route>
          <Route path='/login' element={<Auth />} />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
