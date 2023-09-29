import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { positions, Provider } from 'react-alert';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


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
