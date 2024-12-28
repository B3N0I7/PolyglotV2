import { Routes, Route } from "react-router";
import { ROUTE_URL } from "./constants";
import { Home } from "../../pages/Home";
import { Display } from "../../pages/Display";

export const PolyglotRoutes = () => {
  console.log("ROUTE_URL:", ROUTE_URL);
  return (
    <Routes>
      <Route path={ROUTE_URL.HOME} element={<Home />} index />
      <Route path={ROUTE_URL.DISPLAY} element={<Display />} />
    </Routes>
  );
};
