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
import { useUser } from "@clerk/clerk-react";

export default function LandingPage() {
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && user) {
      // ✅ This is fine — syncing does not redirect
      syncUserToSupabase(user);
    }
  }, [isSignedIn, user, isLoaded]);

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
