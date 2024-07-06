import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, BarChart2, List, Settings } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Layout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Transactions from "./pages/Transactions.jsx";
import SettingsPage from "./pages/Settings.jsx";
import Stocks from "./pages/Stocks.jsx";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Portfolio",
    to: "/portfolio",
    icon: <BarChart2 className="h-4 w-4" />,
  },
  {
    title: "Transactions",
    to: "/transactions",
    icon: <List className="h-4 w-4" />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Stocks",
    to: "/stocks",
    icon: <BarChart2 className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="stocks" element={<Stocks />} />
              </Route>
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;