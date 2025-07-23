"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/auth-context";
import { StudentStatusProvider } from "./contexts/status-context";

/**
 * Main entry point for the ABU Accommodation Portal
 * Sets up React Router and Authentication context
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StudentStatusProvider>
          <App />
        </StudentStatusProvider>
      </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>
);
