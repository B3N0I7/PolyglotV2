import { useState, useEffect } from "react";
import { Layout } from "./../../Layout/Layout";
import { IWord } from "./../../models/word";
import { API_URL_DISPLAY, PAGE_SIZE, TITLE } from "./constants";
import "./display.css";

export const Display = () => {
  const [word, setWord] = useState<IWord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWords = async () => {
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

  const totalPages = Math.ceil(word.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentWords = word.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="display">
        <div className="title">{TITLE}</div>
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
            {currentWords.map((word, index) => (
              <tr key={`${word._id}-${index}`}>
                <td>{word.englishWord}</td>
                <td>{word.frenchWord}</td>
                <td>{word.category}</td>
                <td>{word.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber, index) => (
              <button
                key={`${pageNumber}-${index}`}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? "active" : ""}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};
