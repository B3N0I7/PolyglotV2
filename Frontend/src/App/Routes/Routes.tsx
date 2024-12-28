import { Routes, Route } from "react-router";
import { ROUTE_URL } from "./constants";
import { Home } from "../../pages/Home";

export const PolyglotRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_URL.HOME} element={<Home />} index />
    </Routes>
  );
};
