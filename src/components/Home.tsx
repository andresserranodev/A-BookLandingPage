import { QueryClientProvider } from "@tanstack/react-query";
import AboutAuthorSection from "@/components/AboutAuthorSection";
import AboutBookSection from "@/components/AboutBookSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import PreOrderSection from "@/components/PreOrderSection";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { queryClient } from "@/lib/queryClient";

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
