import { useState } from "react";
import { Layout } from "./../../Layout/Layout";
import { API_URL_ADD, TITLE } from "./constants";
import "./add.css";

export const Add = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [frenchWord, setFrenchWord] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          englishWord: englishWord,
          frenchWord: frenchWord,
          category: category,
          difficulty: difficulty,
          creationDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setEnglishWord("");
        setFrenchWord("");
        setCategory("");
        setDifficulty("");
      } else if (response.status === 401 || response.status === 403) {
        console.log("401 ou 403");
      } else {
        const errorData = await response.json();
        console.error("Word not added. Server response:", errorData.message);
      }
    } catch (error: unknown) {
      console.error("Error: ", error);
    }
  };

  const handleQuit = () => {
    setEnglishWord("");
    setFrenchWord("");
    setCategory("");
    setDifficulty("");
  };

  return (
    <Layout>
      <div className="add">
        <div className="title">{TITLE}</div>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Entrer le mot en anglais</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={englishWord}
                    onChange={(e) => setEnglishWord(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Entrer le mot en français</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={frenchWord}
                    onChange={(e) => setFrenchWord(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Entrer la catégorie</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Entrer le niveau de difficulté</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit">Valider</button>
                </td>
                <td>
                  <button type="button" onClick={handleQuit}>
                    Effacer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Layout>
  );
};
