import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Books from "./pages/Books.jsx";
import Settings from "./pages/Settings.jsx";
import { Provider } from "react-redux";
import store from "./lib/redux/store.js";
import PDFViewr from "./components/Books/PDFViewr.jsx";
import UploadContainer from "./components/Upload/UploadContainer.jsx";
import { ToastContainer } from "react-toastify";
import ConfirmDelete from "./components/ConfirmDelete.jsx";
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
      path: "/user/Books",
      element: <Books />,
    },
    {
      path: "/user/Settings",
      element: <Settings />,
    },
  ]);
  return (
    <Provider store={store}>
      <ToastContainer />
      <PDFViewr />
      <UploadContainer />
      <ConfirmDelete />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
