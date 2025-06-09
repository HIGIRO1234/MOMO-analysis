
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IncomingMoney from "./pages/IncomingMoney";
import BankDeposits from "./pages/BankDeposits";
import MobilePayments from "./pages/MobilePayments";
import Airtime from "./pages/Airtime";
import DataBundles from "./pages/DataBundles";
import UtilityBills from "./pages/UtilityBills";
import MerchantPayments from "./pages/MerchantPayments";
import CashOut from "./pages/CashOut";
import BankTransfers from "./pages/BankTransfers";
import ServicePayments from "./pages/ServicePayments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/incoming-money" element={
            <ProtectedRoute>
              <IncomingMoney />
            </ProtectedRoute>
          } />
          <Route path="/bank-deposits" element={
            <ProtectedRoute>
              <BankDeposits />
            </ProtectedRoute>
          } />
          <Route path="/mobile-payments" element={
            <ProtectedRoute>
              <MobilePayments />
            </ProtectedRoute>
          } />
          <Route path="/airtime" element={
            <ProtectedRoute>
              <Airtime />
            </ProtectedRoute>
          } />
          <Route path="/data-bundles" element={
            <ProtectedRoute>
              <DataBundles />
            </ProtectedRoute>
          } />
          <Route path="/utility-bills" element={
            <ProtectedRoute>
              <UtilityBills />
            </ProtectedRoute>
          } />
          <Route path="/merchant-payments" element={
            <ProtectedRoute>
              <MerchantPayments />
            </ProtectedRoute>
          } />
          <Route path="/cash-out" element={
            <ProtectedRoute>
              <CashOut />
            </ProtectedRoute>
          } />
          <Route path="/bank-transfers" element={
            <ProtectedRoute>
              <BankTransfers />
            </ProtectedRoute>
          } />
          <Route path="/service-payments" element={
            <ProtectedRoute>
              <ServicePayments />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
