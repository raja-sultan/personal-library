import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import Dashboard from '@pages/dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <div>Login Page (TODO)</div>,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reports',
    element: (
      <ProtectedRoute>
        <div>Reports Page (TODO)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/new-hiring',
    element: (
      <ProtectedRoute>
        <div>New Hiring Page (TODO)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-profile',
    element: (
      <ProtectedRoute>
        <div>My Profile Page (TODO)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <div>Settings Page (TODO)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
