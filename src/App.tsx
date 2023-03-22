import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  useReducer
} from "react"

import {
  CredentialsContext,
  CredentialsDispatchContext,
  credentialsReducer,
} from "@common/Credentials"
import {
  Root,
  ErrorPage,
  FeedbackPage,
  AuthPage,
  ChartsPage,
  SearchPage,
  EmailsPage,
  ComplaintsPage,
} from "@common/Routes"

const App = () => {
  const [credentials, dispatch] = useReducer(credentialsReducer, {data: null})
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/graphs",
          element: <ChartsPage />,
        },
        {
          path: "/feedbacks",
          element: <FeedbackPage />,
        },
        {
          path: "/complaints",
          element: <ComplaintsPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/emails",
          element: <EmailsPage />,
        },
      ]
    },
    {
      path: "/auth",
      element: <AuthPage />
    }
  ])
  return (
    <CredentialsContext.Provider value={credentials}>
      <CredentialsDispatchContext.Provider value={dispatch}>
        <RouterProvider router={router} />
      </CredentialsDispatchContext.Provider>
    </CredentialsContext.Provider>
  )
}

export default App
