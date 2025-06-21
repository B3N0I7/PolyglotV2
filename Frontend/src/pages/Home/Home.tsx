import { Layout } from "./../../Layout/Layout";
import "./home.css";

export const Home = () => {
  return (
    <Layout>
      <div className="home">
        <div className="logo">
          <img
            src="logopolyglot.png"
            alt="Logo de l'application Polyglot"
            className="animated-logo"
          />
        </div>
      </div>
    </Layout>
  );
};
