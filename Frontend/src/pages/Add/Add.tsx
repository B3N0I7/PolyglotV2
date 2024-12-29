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
    console.log(`${englishWord}-${frenchWord}`);
    try {
      const response = await fetch(`${API_URL_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          englishWord: englishWord,
          frenchWord: frenchWord,
          category: category,
          difficulty: difficulty,
          creationDate: new Date().toISOString(),
          //   creationDate: Date.UTC,
        }),
      });
      console.log(response);
      if (response.ok) {
        setEnglishWord("");
        setFrenchWord("");
        setCategory("");
        setDifficulty("");
      } else {
        console.error("Word not added.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleQuit = () => {
    setEnglishWord("");
    setFrenchWord("");
    setCategory("");
    setDifficulty("");
    console.log("Formulaire réinitialisé.");
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
          {/* <label>Entrer le mot en anglais</label>
          <input
            type="text"
            value={englishWord}
            onChange={(e) => setEnglishWord(e.target.value)}
            required
          />
          <br />
          <label>Entrer le mot en français</label>
          <input
            type="text"
            value={frenchWord}
            onChange={(e) => setFrenchWord(e.target.value)}
            required
          />
          <br />
          <label>Entrer la catégorie</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label>Entrer le niveau de difficulté</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <br />
          <button type="submit">Valider</button>
          <button type="button" onClick={handleQuit}>
            Effacer
          </button>
          <br /> */}
        </form>
      </div>
    </Layout>
  );
};
