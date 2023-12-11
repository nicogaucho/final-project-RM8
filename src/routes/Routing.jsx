import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Home, { preLoadFilters } from '../pages/Home';
import GenrePage from '../pages/GenrePage';
import GamePage, { getSingleGame } from '../pages/GamePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import Account from '../pages/Account';
import Settings from '../pages/Settings';
import CommentPage from '../pages/CommentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: preLoadFilters,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/account',
            element: <Account />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
      {
        path: '/games/:genre',
        element: <GenrePage />,
        loader: preLoadFilters,
      },
      {
        path: '/game/:id',
        element: <GamePage />,
        loader: getSingleGame,
      },
      {
        path: '/game/:id/comment',
        element: <CommentPage />,
        loader: getSingleGame,
      },
    ],
  },
]);

export default router;
