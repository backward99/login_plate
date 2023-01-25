import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import ErrorPage from './utils/ErrorPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Footer from './components/views/Footer/Footer';
import NavBar from './components/views/NavBar/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/footer',
    element: <Footer />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    element: <NavBar />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
