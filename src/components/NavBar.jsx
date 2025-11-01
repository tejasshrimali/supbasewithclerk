import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import LogoImage from "../assets/images/logosaas.png";
import { Menu } from "lucide-react";
import { Button } from "./ui/Button";

import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="px-4 bg-black">
      <div className="py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(252,214,255,0.7),rgba(41,216,255,0.7),rgba(255,253,128,0.7),rgba(248,154,191,0.7),rgba(252,214,255,0.7))] blur-2xl opacity-70 animate-gradient-glow rounded-full"></div>

          <img
            src={LogoImage}
            alt="SaaS Logo"
            className="relative z-10 h-14 w-14 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)] transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* MOBILE MENU */}
        <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
          <Menu className="text-white" />
        </div>

        {/* NAV LINKS */}
        <nav className="sm:flex sm:gap-6 sm:items-center hidden">
          <Link
            to="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition duration-300"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition duration-300"
          >
            Features
          </Link>
          <Link
            to="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition duration-300"
          >
            Updates
          </Link>
          <Link
            to="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition duration-300"
          >
            Help
          </Link>
          <Link
            to="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition duration-300"
          >
            Customers
          </Link>

          {/* AUTH SECTION */}
          <div className="flex items-center gap-3">
            {/* If user is logged in */}
            <SignedIn>
             
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* If user is logged out */}
            <SignedOut>
              <Button variant="secondary" onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
            </SignedOut>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
