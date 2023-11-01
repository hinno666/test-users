import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { UserInfo } from "./components/Dashboard/components/UserInfo/UserInfo";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/users/:id',
        element: <UserInfo />
      }
    ]
  }
])

const App = () => {
  return (
    <div className="application">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;