import { LanguageProvider } from "@/lib/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutBookSection from "@/components/AboutBookSection";
import AboutAuthorSection from "@/components/AboutAuthorSection";
import PreOrderSection from "@/components/PreOrderSection";
import Footer from "@/components/Footer";

export default function Home({ lang = "en" }: { lang?: "en" | "es" }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
            <Toaster />
          </div>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
