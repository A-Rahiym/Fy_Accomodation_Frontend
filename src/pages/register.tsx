"use client";

/**
 * Modern Register Page Component
 * Updated to use the new Registration Wizard
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationWizard } from "../components/auth/register-wizard";
import { useAuth } from "../contexts/auth-context";
import abuLogo from "../images/abu-logo.png";

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header section with logo and title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4">
              <img
                src={abuLogo} // Path to your actual logo
                alt="ABU Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">ABU ZARIA</h1>
              <p className="text-lg text-white">Accommodation Portal</p>
            </div>
          </div>
        </div>

        {/* Registration Wizard */}
        <RegistrationWizard />
      </div>
    </div>
  );
}
