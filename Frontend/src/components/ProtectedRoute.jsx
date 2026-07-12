import { Navigate } from 'react-router-dom';

function getToken() {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
}

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}