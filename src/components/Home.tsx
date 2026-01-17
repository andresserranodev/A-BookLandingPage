import AboutAuthorSection from "@/components/AboutAuthorSection";
import AboutBookSection from "@/components/AboutBookSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import PreOrderSection from "@/components/PreOrderSection";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home({ lang = "en" }: { lang?: "en" | "es" }) {
  return (
    <LanguageProvider initialLanguage={lang}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutBookSection />
          <AboutAuthorSection />
          <PreOrderSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
