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
    element: <Home></Home>,
  },
  {
    path: '/backOffice',
    element: <BackOfficeHome></BackOfficeHome>,
  },
  {
    path: '/profile',
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
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
