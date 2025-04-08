
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

import Index from "./pages/Index";
import Community from "./pages/Community";
import Weather from "./pages/Weather";
import Prices from "./pages/Prices";
import Map from "./pages/Map";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/community" element={<Community />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/map" element={<Map />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/login" element={<Login />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
