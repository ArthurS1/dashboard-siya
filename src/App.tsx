import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {
  useEffect,
  useReducer
} from 'react';
import Cookies from 'js-cookie';

import {
  CredentialsContext,
  CredentialsDispatchContext,
  credentialsReducer, } from './contexts/Credentials';
import {
  ConfigurationContext,
} from './contexts/Configuration';
import {
  Root,
  ErrorPage,
  AuthPage,
  UserPage,
} from './routes/PagesIndex';
import {
  pagesMenuIndex
} from './routes/MenuPagesIndex';
import Environment from 'common/Environment';

const App = () => {
  const [
    credentials,
    dispatch
  ] = useReducer(credentialsReducer, { data: null });
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: pagesMenuIndex
    },
    {
      path: '/auth',
      element: <AuthPage />
    },
    {
      path: '/user/:userId',
      element: <UserPage />,
      loader: ({params}) => params.userId ?? 'failure'
    }
  ]);

  useEffect(() => {
    const email = Cookies.get('email');
    const password = Cookies.get('password');

    if (email && password) {
      dispatch({
        type: 'modified',
        data: {
          email,
          password,
        }
      });
    }
  }, []);

  return (
    <ConfigurationContext.Provider value={new Environment()}>
      <CredentialsContext.Provider value={credentials}>
        <CredentialsDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router} />
        </CredentialsDispatchContext.Provider>
      </CredentialsContext.Provider>
    </ConfigurationContext.Provider>
  );
};

export default App;
