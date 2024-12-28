import { Routes, Route } from "react-router";
import { ROUTE_URL } from "./constants";
import { Home } from "../../pages/Home";
import { Display } from "../../pages/Display";
import { Add } from "../../pages/Add";
import { Modify } from "../../pages/Modify";
import { Quiz } from "../../pages/Quiz";

export const PolyglotRoutes = () => {
  console.log("ROUTE_URL:", ROUTE_URL);
  return (
    <Routes>
      <Route path={ROUTE_URL.HOME} element={<Home />} index />
      <Route path={ROUTE_URL.DISPLAY} element={<Display />} />
      <Route path={ROUTE_URL.ADD} element={<Add />} />
      <Route path={ROUTE_URL.MODIFY} element={<Modify />} />
      <Route path={ROUTE_URL.QUIZ} element={<Quiz />} />
    </Routes>
  );
};
