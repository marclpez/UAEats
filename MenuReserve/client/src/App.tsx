import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReservationProvider } from "@/lib/reservation-context";
import RestaurantSelection from "@/pages/restaurant-selection";
import MenuSelection from "@/pages/menu-selection";
import PaymentSummary from "@/pages/payment-summary";
import Confirmation from "@/pages/confirmation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={RestaurantSelection} />
      <Route path="/restaurant/:id/menu" component={MenuSelection} />
      <Route path="/payment-summary" component={PaymentSummary} />
      <Route path="/confirmation/:id" component={Confirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ReservationProvider>
          <div className="bg-gray-50 font-sans min-h-screen">
            {/* Navigation Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
              <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                <div className="w-10"></div>
                <h1 className="text-lg font-semibold text-gray-900">Reserva tu Mesa</h1>
                <div className="w-10"></div>
              </div>
            </header>
            <Router />
          </div>
          <Toaster />
        </ReservationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
