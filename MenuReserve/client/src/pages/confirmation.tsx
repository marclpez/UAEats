import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Reservation } from '@shared/schema';
import { useReservation } from '@/lib/reservation-context';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Confirmation() {
  const [, navigate] = useLocation();
  const { dispatch } = useReservation();

  // Extract reservation ID from URL
  const reservationId = window.location.pathname.split('/')[2];

  const { data: reservation, isLoading, error } = useQuery<Reservation>({
    queryKey: [`/api/reservations/${reservationId}`],
    enabled: !!reservationId,
  });

  const handleNewReservation = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4 text-center space-y-6">
        <div className="py-8">
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6" />
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-6" />
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div className="text-center">
              <Skeleton className="h-6 w-3/4 mx-auto mb-1" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <Skeleton className="h-5 w-2/3 mx-auto mb-1" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700" data-testid="text-error-message">
            Error al cargar la confirmación de reserva.
          </p>
          <Button 
            onClick={handleNewReservation} 
            className="mt-2 bg-primary text-white"
            data-testid="button-new-reservation-error"
          >
            Hacer Nueva Reserva
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 text-center space-y-6" data-testid="page-confirmation">
      <div className="py-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-4xl text-primary h-12 w-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
        <p className="text-secondary mb-6">Tu pago ha sido procesado exitosamente</p>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4" data-testid="card-confirmation-details">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Has pagado <span className="text-primary font-bold" data-testid="text-confirmed-amount">
                {parseFloat(reservation.totalPrice).toFixed(2)}€
              </span>
            </p>
            <p className="text-secondary">
              Tu mesa te espera a las <span className="font-medium text-gray-900" data-testid="text-confirmed-time">
                {reservation.timeSlot}
              </span>
            </p>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <p className="font-medium text-gray-900 mb-1" data-testid="text-confirmed-restaurant">
              {reservation.restaurantName}
            </p>
            <p className="text-sm text-secondary">Te esperamos para disfrutar de tu menú</p>
          </div>

          <div className="border-t border-gray-100 pt-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span>Primer plato:</span>
              <span data-testid="text-confirmed-primer">{reservation.primerPlatoName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Segundo plato:</span>
              <span data-testid="text-confirmed-segundo">{reservation.segundoPlatoName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Postre:</span>
              <span data-testid="text-confirmed-postre">{reservation.postreName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleNewReservation}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
          data-testid="button-new-reservation"
        >
          Hacer Nueva Reserva
        </Button>
        <Button 
          variant="outline"
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          data-testid="button-view-reservations"
        >
          Ver Mis Reservas
        </Button>
      </div>
    </div>
  );
}
