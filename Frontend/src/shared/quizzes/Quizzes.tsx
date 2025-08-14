import { useState } from "react";
import { IQuizzesProps } from "./../../models/quizzes";
import { Layout } from "./../../Layout/Layout";
import "./quizzes.css";

export const Quizzes = ({
  translationType,
  apiUriRandomWord,
  apiUriVerifyWord,
  title,
}: IQuizzesProps) => {
  const [currentWord, setCurrentWord] = useState({
    id: null,
    englishWord: "",
    frenchWord: "",
  });
  const [userInput, setUserInput] = useState({
    englishWord: "",
    frenchWord: "",
  });

  const generateWord = async () => {
    try {
      const response = await fetch(`${apiUriRandomWord}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setCurrentWord({
        id: data.id,
        englishWord: translationType === "toFrench" ? data.englishWord : "",
        frenchWord: translationType === "toEnglish" ? data.frenchWord : "",
      });
      setUserInput({
        englishWord: translationType === "toFrench" ? data.englishWord : "",
        frenchWord: translationType === "toEnglish" ? data.frenchWord : "",
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du mot :", error);
    }
  };

  const verifyTranslation = async () => {
    try {
      const response = await fetch(`${apiUriVerifyWord}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wordId: currentWord.id,
          englishWord: userInput.englishWord,
          frenchWord: userInput.frenchWord,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la traduction :", error);
    }
  };

  return (
    <Layout>
      <div className="quizzes">
        <div className="title">{title}</div>
        <table>
          <thead>
            <tr>
              <th>
                {translationType === "toFrench"
                  ? "Mot anglais"
                  : "Mot français"}
              </th>
              <th>
                {translationType === "toFrench"
                  ? "Mot français"
                  : "Mot anglais"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea
                  value={
                    translationType === "toFrench"
                      ? userInput.englishWord
                      : userInput.frenchWord
                  }
                  onChange={(e) =>
                    setUserInput({
                      ...userInput,
                      [translationType === "toFrench"
                        ? "englishWord"
                        : "frenchWord"]: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <textarea
                  value={
                    translationType === "toFrench"
                      ? userInput.frenchWord
                      : userInput.englishWord
                  }
                  onChange={(e) =>
                    setUserInput({
                      ...userInput,
                      [translationType === "toFrench"
                        ? "frenchWord"
                        : "englishWord"]: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={generateWord}>
                  Générer un mot{" "}
                  {translationType === "toFrench" ? "anglais" : "français"}
                </button>
              </td>
              <td>
                <button onClick={verifyTranslation}>
                  Vérifier le mot{" "}
                  {translationType === "toFrench" ? "français" : "anglais"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
