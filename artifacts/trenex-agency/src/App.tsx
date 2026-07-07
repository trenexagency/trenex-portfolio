import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AmbientBackground } from "@/components/three/AmbientBackground";
import { GridBackground } from "@/components/GridBackground";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { TrophySection } from "@/components/sections/TrophySection";
import { ExpertiseWall } from "@/components/sections/ExpertiseWall";
import { Contact } from "@/components/sections/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <GridBackground />
      <CustomCursor />
      {!entered && <LoadingScreen onEnter={() => setEntered(true)} />}
      {entered && (
        <div className="relative z-10">
          <Header />
          <Hero />
          <Services />
          <Stats />
          <TrophySection />
          <ExpertiseWall />
          <Contact />
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
