
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DetailsPage from "./pages/detailsPage";
import Favourite from "./pages/favourite";
import ItemsPage from "./pages/itemsPage";
import LoginPage from "./pages/loginPage";
import Root from "./pages/Root";
import AuthProvider from "./store/AuthContext";
import ItemsProvider from "./store/itemsContext";

function App() {


  const route = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/items", element: <ItemsPage  /> },
        { path: "/items/:id", element: <DetailsPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/fav", element: <Favourite /> },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <ItemsProvider>
       
          <RouterProvider router={route} />
        </ItemsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
