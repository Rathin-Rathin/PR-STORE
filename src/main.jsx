import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './Pages/Home/Home';
import StoreIn from './Pages/StoreIn/StoreIn';
import Main from './Layout/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element:<Home/>
     },
      {
        path: '/home',
        element:<Home/>
      },
      {
        path: 'storeIn',
        element:<StoreIn/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
