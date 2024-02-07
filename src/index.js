import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './Pages/Profile';
import SignIn from './Pages/UserAuth/SignIn';
import SignUp from './Pages/UserAuth/SignUp';
import Home from './Pages/Home';
import TestWindow from './Components/TestWindow';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
  {
    path : "/profile",
    element : <div><Profile /></div>
  },
  {
    path : "/signin",
    element : <div><SignIn /></div>
  },
  {
    path : "/signup",
    element : <div><SignUp /></div>
  },
  {
    path : "/home",
    element : <div><Home /></div>
  },
  {
    path : "/takeTest",
    element : <div><TestWindow /></div>
  },
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);