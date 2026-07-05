import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black">
      {!entered && <LoadingScreen onEnter={() => setEntered(true)} />}
      {entered && (
        <>
          <Header />
          <Hero />
          <Services />
          <Footer />
        </>
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
