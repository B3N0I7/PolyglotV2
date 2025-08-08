import { useState } from "react";
import { Layout } from "./../../Layout/Layout";
import { IWord } from "./../../models/word";
import {
  TITLE,
  API_URL_MODIFY,
  API_URL_ENGLISH_WORD,
  API_URL_FRENCH_WORD,
} from "./constants";
import "./modify.css";

export const Modify = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [wordData, setWordData] = useState<IWord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEnglish
      ? `${API_URL_ENGLISH_WORD}/${searchWord}`
      : `${API_URL_FRENCH_WORD}/${searchWord}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data: IWord = await response.json();
      setWordData(data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordData) {
      try {
        const response = await fetch(`${API_URL_MODIFY}/${wordData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            englishWord: wordData.englishWord,
            frenchWord: wordData.frenchWord,
            category: wordData.category,
            difficulty: wordData.difficulty,
          }),
        });

        if (response.ok) {
          console.log("OK");
        }

        if (!response.ok) {
          throw new Error("Error updating word");
        }
      } catch (error) {
        console.error("Error :", error);
      }
    }
  };

  return (
    <Layout>
      <div className="modify">
        <div className="title">{TITLE}</div>
        <form onSubmit={handleSearch}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="Mot à rechercher"
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
                <td>
                  <button type="submit">Rechercher</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {wordData && (
          <form onSubmit={handleUpdate}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Mot anglais</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={wordData.englishWord}
                      onChange={(e) =>
                        setWordData({
                          ...wordData,
                          englishWord: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Mot français</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={wordData.frenchWord}
                      onChange={(e) =>
                        setWordData({ ...wordData, frenchWord: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Catégorie</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={wordData.category || ""}
                      onChange={(e) =>
                        setWordData({ ...wordData, category: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Difficulté</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={wordData.difficulty || ""}
                      onChange={(e) =>
                        setWordData({ ...wordData, difficulty: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button type="submit">Mettre à jour</button>
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
