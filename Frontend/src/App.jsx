import { Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './components/Authpage';
import ReportsAnalytics from './components/ReportsAnalytics';
import Audit from './components/Audit';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/';

  return (
    <div>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <ReportsAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <Audit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;