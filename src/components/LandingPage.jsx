import Banner from "./Banner";
import NavBar from "./NavBar";
import Hero from "./Hero";
import LogoTicker from "./LogoTicker";
import Features from "./Features";
import ProductShowCase from "./ProductShowCase";
import FAQs from "./FAQs";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { syncUserToSupabase } from "../syncUserToSupbase";
import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import MoreDetailsForm from "../MoreDetailsForm";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  console.log("User info:", user);
  useEffect(() => {
    if (isSignedIn && user) {
      syncUserToSupabase(user);
      
      if (
        !localStorage.getItem("formShown") ||
        localStorage.getItem("formShown") === "false"
      ) {
        navigate("/more-info");
      }
    }
  }, [isSignedIn, user]);

  return (
    <div>
      <Banner />
      <NavBar />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowCase />
      <FAQs />
      <CallToAction />
      <Footer />
    </div>
  );
}
