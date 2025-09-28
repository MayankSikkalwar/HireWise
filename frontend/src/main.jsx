import React from 'react';
import ReactDOM from 'react-dom/client';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'


import { AuthProvider}  from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now the main layout
    children: [
      {
        index: true, // <-- THIS IS THE FIX: makes HomePage the default
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);



