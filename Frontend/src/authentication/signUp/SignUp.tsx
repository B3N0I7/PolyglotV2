import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../../Layout";
import "./signUp.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setEmail(email);
    setPassword(password);

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        navigate("/signin");
      }

      if (!response.ok) {
        throw new Error("Error while signup");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Layout>
      <div className="signup">
        <form onSubmit={handleSignUp}>
          <table className="table-signup">
            <thead>
              <tr>
                <th>S'inscrire</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>Email</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Mot de passe</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit">S'inscrire</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Layout>
  );
};
