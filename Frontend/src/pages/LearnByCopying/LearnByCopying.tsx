import { useState } from "react";
import { Layout } from "../../Layout/Layout";
import { IRandomWord } from "../../models/randomWord";
import { API_URL_LEARN, TITLE } from "./constants";
import "./learnByCopying.css";

export const LearnByCopying = () => {
  const [randomWords, setRandomWords] = useState<IRandomWord[]>([]);
  const [count, setCount] = useState(1);
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [userInputs, setUserInputs] = useState(["", "", ""]);

  const handleRandomWords = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL_LEARN}/${count}`);
      const data: IRandomWord[] = await response.json();
      setRandomWords(data);
      //   setWordIndex(0);
      //   setUserInputs(["", "", ""]);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newInput = [...userInputs];
    newInput[index] = value;
    setUserInputs(newInput);
  };

  const handleNextWord = () => {
    if (
      userInputs.every((input) =>
        isEnglish
          ? input === randomWords[wordIndex].englishWord
          : input === randomWords[wordIndex].frenchWord
      )
    ) {
      if (wordIndex < randomWords.length - 1) {
        setWordIndex(wordIndex + 1);
        setUserInputs(["", "", ""]);
      } else {
        alert("Plus de mots");
      }
    } else {
      alert("Il y a des erreurs");
    }
  };

  return (
    <Layout>
      <div className="learn">
        <div className="title">{TITLE}</div>
        <form onSubmit={handleRandomWords}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Entrer un nombre de mot</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    placeholder="Nombre de mots"
                    min="1"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="radio"
                      value="english"
                      checked={isEnglish}
                      onChange={() => setIsEnglish(true)}
                    />{" "}
                    Anglais
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="french"
                      checked={!isEnglish}
                      onChange={() => setIsEnglish(false)}
                    />{" "}
                    Français
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button type="submit">Envoyer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {randomWords.length > 0 && (
          <form>
            <table>
              <thead>
                <tr>
                  <td>Mot {isEnglish ? "anglais" : "français"}</td>
                  <td colSpan={2}>Recopier le mot</td>
                </tr>
              </thead>
              <tbody>
                {/* {randomWords.map((randomWord) => ( */}
                <tr key={randomWords[wordIndex]._id}>
                  <td>
                    {isEnglish
                      ? randomWords[wordIndex].englishWord
                      : randomWords[wordIndex].frenchWord}
                  </td>
                  <td>
                    se traduit par :{" "}
                    {isEnglish
                      ? randomWords[wordIndex].frenchWord
                      : randomWords[wordIndex].englishWord}
                  </td>
                  <td>
                    {userInputs.map((input, index) => (
                      <input
                        key={index}
                        type="text"
                        value={input}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        placeholder="recopier"
                      />
                    ))}
                    {/* <input type="text" placeholder="recopier" />
                      <input type="text" placeholder="recopier" />
                      <input type="text" placeholder="recopier" /> */}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <button type="button" onClick={handleNextWord}>
                      Suivant
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    </Layout>
  );
};
