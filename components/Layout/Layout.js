import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
// import styles from "./Layout.module.scss";

export default function Layout({ t, children, noNavbar, noFooter }) {
  return (
    <>
      {noNavbar === true ? null : <Navbar />}
      {children}
      {noFooter ? null : <Footer t={t} />}
    </>
  );
}
