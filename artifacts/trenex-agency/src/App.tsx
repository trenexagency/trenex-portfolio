import { lazy, Suspense, useState } from "react";
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
import { TransitionProvider } from "@/components/PageTransition";
import { AssetProtection } from "@/components/AssetProtection";

/* Route-level code splitting — these pages are only needed when the user
   navigates to them, so they stay out of the initial JS bundle.          */
const GraphicDesignPage  = lazy(() => import("@/pages/graphic-design"));
const VideoEditingPage   = lazy(() => import("@/pages/video-editing"));
const WebDevelopmentPage = lazy(() => import("@/pages/web-development"));
const NotFound           = lazy(() => import("@/pages/not-found"));

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
          <ExpertiseWall />
          <Contact />
          <TrophySection />
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/graphic-design" component={GraphicDesignPage} />
        <Route path="/video-editing" component={VideoEditingPage} />
        <Route path="/web-development" component={WebDevelopmentPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AssetProtection />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <TransitionProvider>
            <Router />
          </TransitionProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
