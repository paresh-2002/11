import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentsList from './components/StudentsList';
import Login from './components/userAuth/Login';
import SignUp from './components/userAuth/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path: '/',
    element:<App/>,
    children:[{
      path:'/',
      element:<StudentsList/>,
    }]
  },
  {path: '/',
    element:<App/>,
    children:[{
      path: "/edit/:id",
      element:<StudentForm/>,
    }]
  },
  {path: '/',
    element:<App/>,
    children:[{
      path:'/add-student',
      element:<StudentForm/>,
    }]
  },
  {path: '/login',element:<Login/>},
  {path: '/signup',element:<SignUp/>}
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
