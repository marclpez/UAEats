import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useReservation } from '@/lib/reservation-context';
import { apiRequest } from '@/lib/queryClient';
import OrderSummary from '@/components/order-summary';
import LoadingOverlay from '@/components/loading-overlay';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function PaymentSummary() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useReservation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const createReservationMutation = useMutation({
    mutationFn: async () => {
      if (!state.selectedRestaurant || !state.selectedItems.primer || !state.selectedItems.segundo || !state.selectedItems.postre || !state.selectedTimeSlot) {
        throw new Error('Faltan datos de la reserva');
      }

      const reservationData = {
        restaurantId: state.selectedRestaurant.id,
        restaurantName: state.selectedRestaurant.name,
        primerPlatoId: state.selectedItems.primer.id,
        primerPlatoName: state.selectedItems.primer.name,
        primerPlatoPrice: state.selectedItems.primer.price,
        segundoPlatoId: state.selectedItems.segundo.id,
        segundoPlatoName: state.selectedItems.segundo.name,
        segundoPlatoPrice: state.selectedItems.segundo.price,
        postreId: state.selectedItems.postre.id,
        postreName: state.selectedItems.postre.name,
        postrePrice: state.selectedItems.postre.price,
        timeSlot: state.selectedTimeSlot,
        totalPrice: state.totalPrice.toString(),
        status: 'confirmed'
      };

      const response = await apiRequest('POST', '/api/reservations', reservationData);
      return await response.json();
    },
    onSuccess: (reservation) => {
      setIsProcessingPayment(false);
      navigate(`/confirmation/${reservation.id}`);
    },
    onError: () => {
      setIsProcessingPayment(false);
      // Handle error - could show toast notification
    },
  });

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    // Simulate payment processing delay
    setTimeout(() => {
      createReservationMutation.mutate();
    }, 2000);
  };

  const handleBack = () => {
    if (state.selectedRestaurant) {
      navigate(`/restaurant/${state.selectedRestaurant.id}/menu`);
    } else {
      navigate('/');
    }
  };

  if (!state.selectedRestaurant || !state.selectedItems.primer || !state.selectedItems.segundo || !state.selectedItems.postre) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">
            No hay datos de reserva. Por favor, selecciona un menú primero.
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-2 bg-primary text-white"
            data-testid="button-back-to-start"
          >
            Ir a Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6" data-testid="page-payment-summary">
      <Button 
        onClick={handleBack}
        variant="ghost" 
        className="mb-4"
        data-testid="button-back"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resumen de tu Pedido</h2>
        <p className="text-secondary">Revisa los detalles antes de confirmar</p>
      </div>

      <OrderSummary />

      <Button 
        onClick={handleConfirmPayment}
        className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        disabled={isProcessingPayment}
        data-testid="button-confirm-payment"
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Confirmar y Pagar
      </Button>

      <LoadingOverlay isVisible={isProcessingPayment} />
    </div>
  );
}
