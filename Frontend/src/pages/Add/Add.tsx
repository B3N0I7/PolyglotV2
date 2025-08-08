import { useState } from "react";
import { Layout } from "./../../Layout/Layout";
import { Message } from "../../shared/messages/Messages";
import { API_URL_ADD, TITLE } from "./constants";
import "./add.css";

export const Add = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [frenchWord, setFrenchWord] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

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
        setMessage("Le mot a été ajouté avec succès !");
        setMessageType("colorGreen");
      } else if (response.status === 401 || response.status === 403) {
        setMessage("Vous n'êtes pas autorisé à ajouter des mots.");
        setMessageType("colorOrange");
      } else {
        const errorData = await response.json();
        setMessage("Erreur lors de l'ajout : " + errorData.message);
        setMessageType("colorWhite");
      }
    } catch (error: unknown) {
      setMessage("Erreur réseau ou serveur.");
      setMessageType("error");
    }
  };

  const handleQuit = () => {
    setEnglishWord("");
    setFrenchWord("");
    setCategory("");
    setDifficulty("");
    setMessage("");
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
                <td colSpan={2}>
                  <Message
                    message={message}
                    setMessage={setMessage}
                    type={messageType}
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
