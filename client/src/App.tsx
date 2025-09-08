import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import OpeningAnimation from "@/components/animations/opening-animation";
import Preloader from "@/components/preloader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOpening, setShowOpening] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isLoading ? (
          <Preloader onComplete={handleLoadingComplete} />
        ) : showOpening ? (
          <OpeningAnimation onComplete={handleOpeningComplete} />
        ) : (
          <Router />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
