import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import styles from "./Layout.module.scss";

export default function Layout_M({
  t,
  children,
  noNavbar,
  noFooter,
  navClass,
}) {
  return (
    <>
      {noNavbar === true ? null : <Navbar navClass={navClass} />}
      {children}
      {noFooter ? null : <Footer t={t} />}
    </>
  );
}
