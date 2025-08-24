import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Restaurant } from '@shared/schema';
import RestaurantCard from '@/components/restaurant-card';
import { useReservation } from '@/lib/reservation-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function RestaurantSelection() {
  const [, navigate] = useLocation();
  const { dispatch } = useReservation();

  const { data: restaurants, isLoading, error } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
    retry: 1,
  });

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    dispatch({ type: 'SET_RESTAURANT', payload: restaurant });
    navigate(`/restaurant/${restaurant.id}/menu`);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="text-center py-4">
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700" data-testid="text-error-message">
            Error al cargar los restaurantes. Por favor, intenta de nuevo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6" data-testid="page-restaurant-selection">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Elige tu Restaurante</h2>
        <p className="text-secondary">Descubre los mejores sabores cerca de ti</p>
        <p className="text-xs text-gray-500 mt-2">Haz click en "Ver Menú y Reservar" para explorar cada restaurante</p>
      </div>

      <div className="space-y-6" data-testid="list-restaurants">
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantSelect(restaurant)}
          />
        ))}
      </div>
      
      {restaurants && restaurants.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            {restaurants.length} restaurantes disponibles
          </p>
        </div>
      )}
    </div>
  );
}
