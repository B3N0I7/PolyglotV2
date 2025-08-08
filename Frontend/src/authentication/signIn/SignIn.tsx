import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../../Layout";
import { AuthContext } from "../../context/AuthContext";
import { API_URL_SIGNIN } from "./constants";
import "./signIn.css";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setIsConnected } = useContext(AuthContext);

  const handleSignin = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_URL_SIGNIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsConnected(true);
        navigate("/");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion.");
      }
    } catch (error) {
      console.error("Error", error);
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue."
      );
      navigate("/errorsign");
    }
  };

  return (
    <Layout>
      <div className="signin">
        <table className="table-signin">
          <thead>
            <tr>
              <th>Se connecter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email</td>
            </tr>
            <tr>
              <td>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleSignin}>Se connecter</button>
              </td>
            </tr>
            {error && (
              <tr>
                <td style={{ color: "red", textAlign: "center" }}>{error}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
