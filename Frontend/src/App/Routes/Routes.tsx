import { Routes, Route } from "react-router";
import { ROUTE_URL } from "./constants";
import { Home } from "../../pages/Home";
import { SignIn } from "../../authentication/signIn/SignIn";
import { SignUp } from "../../authentication/signUp/SignUp";
import { ErrorSign } from "../../authentication/error/ErrorSign";
import { Display } from "../../pages/Display";
import { Add } from "../../pages/Add";
import { Modify } from "../../pages/Modify";
import { QuizEnglishToFrench } from "../../pages/QuizEnglishToFrench";
import { QuizFrenchToEnglish } from "../../pages/QuizFrenchToEnglish";
import { LearnByCopying } from "../../pages/LearnByCopying/LearnByCopying";

export const PolyglotRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_URL.HOME} element={<Home />} index />
      <Route path={ROUTE_URL.SIGNIN} element={<SignIn />} />
      <Route path={ROUTE_URL.SIGNUP} element={<SignUp />} />
      <Route path={ROUTE_URL.ERRORSIGN} element={<ErrorSign />} />
      <Route path={ROUTE_URL.DISPLAY} element={<Display />} />
      <Route path={ROUTE_URL.ADD} element={<Add />} />
      <Route path={ROUTE_URL.MODIFY} element={<Modify />} />
      <Route
        path={ROUTE_URL.QUIZ_ENGLISH_TO_FRENCH}
        element={<QuizEnglishToFrench />}
      />
      <Route
        path={ROUTE_URL.QUIZ_FRENCH_TO_ENGLISH}
        element={<QuizFrenchToEnglish />}
      />
      <Route path={ROUTE_URL.LEARN} element={<LearnByCopying />} />
    </Routes>
  );
};
