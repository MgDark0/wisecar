import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Contact from "@/pages/Contact";
import CarDetails from "@/pages/CarDetails";
import Payment from "@/pages/Payment";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

function Router({ onResetSplash }: { onResetSplash?: () => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/contact" component={Contact} />
          <Route path="/cars/:id" component={CarDetails} />
          <Route path="/payment" component={Payment} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      
      {/* Debug button for testing splash screen */}
      {onResetSplash && (
        <button 
          onClick={onResetSplash}
          className="fixed right-4 bottom-4 bg-black/60 hover:bg-black/80 text-white text-xs rounded-full p-2 z-10"
          title="Reset splash screen"
        >
          🔄 Reset Intro
        </button>
      )}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedWiseCars');
    if (hasVisited) {
      setIsFirstVisit(false);
      setShowSplash(false);
    } else {
      // Set flag for future visits
      localStorage.setItem('hasVisitedWiseCars', 'true');
    }
  }, []);
  
  const handleSplashFinished = () => {
    setShowSplash(false);
  };
  
  // Add a function to reset the splash screen for testing
  const resetSplashScreen = () => {
    localStorage.removeItem('hasVisitedWiseCars');
    setIsFirstVisit(true);
    setShowSplash(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence>
          {showSplash && isFirstVisit && (
            <SplashScreen onFinished={handleSplashFinished} />
          )}
        </AnimatePresence>
        <Toaster />
        <Router onResetSplash={resetSplashScreen} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
