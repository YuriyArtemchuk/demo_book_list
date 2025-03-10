import Footer from "./Footer";
import Header from "./Header";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <>
      <section className="container-fluid">
        <Header />
        <main className="main">{props.children}</main>
        <Footer />
      </section>
    </>
  );
};

export default Layout;
