import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import AuthLayout from "./(auth)/AuthLayout";
import SignInPage from "./(auth)/SignIn";

import SignUpPage from "./(auth)/SignUp";
import { Dashboard } from "./(main)/dashboard/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./components/LandingPage";
import MoreDetailsForm from "./MoreDetailsForm";
import Bot from "./components/chatbot";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/sign-in"
          element={
            <SignIn afterSignInUrl="/dashboard" redirectUrl="/dashboard" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route path="/more-info" element={<MoreDetailsForm />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <div className="min-h-screen bg-gray-100">
               <Bot />
              </div>
            </ProtectedRoutes>
          }
        />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
