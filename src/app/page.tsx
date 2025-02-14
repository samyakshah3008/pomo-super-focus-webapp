import Awards from "@/components/landing-page/awards";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import SpecialMessage from "@/components/landing-page/special-message";
import WelcomeContributors from "@/components/landing-page/welcome-contributors";
import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default function Home() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  let isAuthenticated = false;
  if (accessToken) {
    isAuthenticated = true;
  }
  return (
    <div className="">
      <Navbar isAuthenticated={isAuthenticated} />

      <Hero isAuthenticated={isAuthenticated} />

      <Awards />

      <Features />

      <WelcomeContributors />

      <SpecialMessage />

      <Footer />
    </div>
  );
}
