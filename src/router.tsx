import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Upcoming from "./routes/Upcoming";
import Search from "./routes/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "search", element: <Search /> },
    ],
  },
]);
