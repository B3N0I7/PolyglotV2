import { useState, useEffect } from "react";
import { Layout } from "./../../Layout/Layout";
import { IWord } from "./../../models/word";
import { API_URL_DISPLAY, TITLE } from "./constants";
import "./display.css";

export const Display = () => {
  const [word, setWord] = useState<IWord[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      console.log({ API_URL_DISPLAY });
      try {
        const response = await fetch(`${API_URL_DISPLAY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setWord(data);
      } catch (error) {
        console.error("Error fetching words", error);
      }
    };
    fetchWords();
  }, []);

  return (
    <Layout>
      <div className="display">
        <h3>{TITLE}</h3>
        <br />
        <table>
          <thead>
            <tr>
              <th>Mot anglais</th>
              <th>Mot français</th>
              <th>Catégorie</th>
              <th>Difficulté</th>
            </tr>
          </thead>
          <tbody>
            {word.map((word, index) => (
              <tr key={`${word._id}-${index}`}>
                <td>{word.englishWord}</td>
                <td>{word.frenchWord}</td>
                <td>{word.category}</td>
                <td>{word.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
