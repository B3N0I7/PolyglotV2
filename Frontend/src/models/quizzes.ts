type TranslationType = "toFrench" | "toEnglish";

export interface IQuizzesProps {
  translationType: TranslationType;
  apiUriRandomWord: string;
  apiUriVerifyWord: string;
  title: string;
}
