import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import PageNotFound from "./pages/404";
import { UserContainer } from "./pages/users/UserContainer";
import { TravelerContainer } from "./pages/travelers/TravelerContainer";
import { ReservationContainer } from "./pages/reservation/ReservationContainer";
import { TrainsContainer } from "./pages/trains/TrainsContainer";
import Protected from "./features/auth/components/Protected";

const routes = [
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/error",
    element: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Layout>
          <Home></Home>
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/users",
    element: (
      <Protected>
        <Layout>
          <UserContainer />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/travelers",
    element: (
      <Protected>
        <Layout>
          <TravelerContainer />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/reservations",
    element: (
      <Protected>
        <Layout>
          <ReservationContainer />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/train",
    element: (
      <Protected>
        <Layout>
          <TrainsContainer />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <LoginPage></LoginPage>,
  },
];
const localUser = JSON.parse(localStorage.getItem("user"));

const filterRouter =
  localUser?.data?.userType !== "b-office"
    ? routes.filter((item) => item.path !== "/train")
    : routes;

const router = createBrowserRouter(filterRouter);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
