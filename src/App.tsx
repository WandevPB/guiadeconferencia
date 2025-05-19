import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import ConferencePage from "./pages/ConferencePage";
import { TransactionProvider } from "./contexts/TransactionContext";
import { GoogleSheetsProvider } from "./contexts/GoogleSheetsContext";
import { TransactionHistoryProvider } from "./contexts/TransactionHistoryContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleSheetsProvider>
      <TransactionProvider>
        <TransactionHistoryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/add-item" element={<AddItemPage />} />
                <Route path="/conferencia" element={<ConferencePage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </TransactionHistoryProvider>
      </TransactionProvider>
    </GoogleSheetsProvider>
  </QueryClientProvider>
);

export default App;
