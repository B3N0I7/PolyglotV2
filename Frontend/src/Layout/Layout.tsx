import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
