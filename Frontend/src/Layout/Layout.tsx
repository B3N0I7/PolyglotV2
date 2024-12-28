import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
