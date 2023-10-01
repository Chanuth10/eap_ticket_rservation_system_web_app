import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { positions, Provider } from 'react-alert';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import BackOfficeHome from './pages/BackOfficeHome';
import UserProfilePage from './pages/UserProfilePage';
import PageNotFound from './pages/404';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: '/backOffice',
    element: (
      <ProtectedAdmin>
        <BackOfficeHome></BackOfficeHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  return (
    <div className='App'>
      <Provider {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;