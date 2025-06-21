import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import "./layout.css";

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div className="layout-container">
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
