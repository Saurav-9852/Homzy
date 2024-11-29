import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation(); // Get the current route

  // Check if the current URL is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      style={{
        background: isLoginPage ? "none" : "var(--black)", 
        overflow: "hidden",
      }}
    >
      {/* Conditionally render Header */}
      {!isLoginPage && <Header />}
      
      <Outlet />

      {/* Conditionally render Footer */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;
