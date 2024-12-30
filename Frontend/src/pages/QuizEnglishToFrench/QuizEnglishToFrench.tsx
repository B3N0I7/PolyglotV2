import { Quizzes } from "./../../shared/quizzes/Quizzes";
import {
  TRANSLATION_TYPE,
  API_URL_RANDOM_WORD,
  API_URL_VERIFY_WORD,
  TITLE,
} from "./constants";
import "./quizEnglishToFrench.css";

export const QuizEnglishToFrench = () => (
  <Quizzes
    translationType={TRANSLATION_TYPE}
    apiUriRandomWord={API_URL_RANDOM_WORD}
    apiUriVerifyWord={API_URL_VERIFY_WORD}
    title={TITLE}
  />
);
