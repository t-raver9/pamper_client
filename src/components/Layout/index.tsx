import { ReactNode } from "react";
import Navbar from "../Navbar";
import Logo from "../Logo";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Link to="/">
        <Logo />
      </Link>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
