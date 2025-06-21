import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import { PolyglotRoutes } from "./../App/Routes/Routes";

export function App() {
  return (
    <Router>
      <AuthProvider>
        <PolyglotRoutes />
      </AuthProvider>
    </Router>
  );
}
