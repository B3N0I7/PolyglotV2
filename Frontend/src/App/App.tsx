import { BrowserRouter as Router } from "react-router";
import { PolyglotRoutes } from "./../App/Routes/Routes";

export function App() {
  return (
    <>
      <Router>
        <PolyglotRoutes />
      </Router>
    </>
  );
}
