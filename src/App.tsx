import * as React from "react"
import AdminData from "./AdminData.interface"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  Root,
  ErrorPage,
  FeedbackPage,
  AuthPage,
  ChartsPage,
  SearchPage,
  EmailsPage,
} from "./Routes"

const App = () => {
  const [adminData, setAdminData] =
    React.useState<AdminData | undefined>(undefined)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/graphs",
          element: <ChartsPage data={adminData} />,
        },
        {
          path: "/feedbacks",
          element: <FeedbackPage data={adminData} />,
        },
        {
          path: "/complaints",
          element: <ErrorPage />,
        },
        {
          path: "/search",
          element: <SearchPage data={adminData} />,
        },
        {
          path: "/emails",
          element: <EmailsPage />,
        },
      ]
    },
    {
      path: "/auth",
      element: <AuthPage dataSetter={setAdminData} />
    }
  ])
  return (
      <RouterProvider router={router} />
  )
}

export default App
