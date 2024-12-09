import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home/Home";
import Popular from "./routes/Popular";
import NowPlaying from "./routes/NowPlaying";
import Upcoming from "./routes/Upcoming";
import TopRated from "./routes/TopRated";
import Search from "./routes/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "popular", element: <Popular /> },
      { path: "nowplaying", element: <NowPlaying /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "toprated", element: <TopRated /> },
    ],
  },
]);
