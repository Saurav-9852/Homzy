import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const isLocal = window.location.hostname === "localhost";

const redirectUri = "http://localhost:3000/login"; // The login page URL

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
      <App />
   
  </React.StrictMode>
);
