import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './pages/Main';
import { PostList } from './pages/PostList';
import { PostView } from './pages/Postview';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
          <App />
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'list', element: <PostList /> },
      { path: 'view', element: <PostView /> },
    ],
  },
  // {
  //   path: '/error',
  //   element: <Error />
  // },
  // {
  //   path: '*',
  //   element: <NotFound />
  // },

  // { path: '/eng', element: <MainEng /> }
]);

root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
