import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import { Provider } from "react-redux";
import store from "./lib/redux/store.js";
import PDFViewr from "./components/dashboard/PDFViewr.jsx";
import UploadContainer from "./components/Upload/UploadContainer.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/user/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/user/Settings",
      element: <Settings />,
    },
  ]);
  return (
    <Provider store={store}>
      <PDFViewr />
      <UploadContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
