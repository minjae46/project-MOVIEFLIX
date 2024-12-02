import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home/Home";
import Upcoming from "./routes/Upcoming";
import Search from "./routes/Search";
import Popular from "./routes/Popular";
import NowPlaying from "./routes/NowPlaying";
import TopRated from "./routes/TopRated";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "popular", element: <Popular /> },
      { path: "nowplaying", element: <NowPlaying /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "toprated", element: <TopRated /> },
      { path: "search", element: <Search /> },
    ],
  },
]);
