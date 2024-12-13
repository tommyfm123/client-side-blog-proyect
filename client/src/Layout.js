// import Header from "./components/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import HeaderNew from "./components/header2.jsx"

export default function Layout() {
  return (
    <main>
      <HeaderNew />
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </main>
  );
}