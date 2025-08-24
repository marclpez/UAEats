import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { MenuItem, TimeSlot } from '@shared/schema';
import { useReservation } from '@/lib/reservation-context';
import MenuForm from '@/components/menu-form';
import MenuPreview from '@/components/menu-preview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MenuSelection() {
  const [, navigate] = useLocation();
  const { state } = useReservation();

  // Extract restaurant ID from URL
  const restaurantId = window.location.pathname.split('/')[2];

  const { data: menuItems, isLoading: menuLoading } = useQuery<MenuItem[]>({
    queryKey: [`/api/restaurants/${restaurantId}/menu`],
    enabled: !!restaurantId,
  });

  const { data: timeSlots, isLoading: slotsLoading } = useQuery<TimeSlot[]>({
    queryKey: [`/api/restaurants/${restaurantId}/timeslots`],
    enabled: !!restaurantId,
  });

  const handleContinue = () => {
    navigate('/payment-summary');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!state.selectedRestaurant) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">
            Por favor, selecciona un restaurante primero.
          </p>
          <Button 
            onClick={handleBack} 
            className="mt-2 bg-primary text-white"
            data-testid="button-back-to-restaurants"
          >
            Volver a Restaurantes
          </Button>
        </div>
      </div>
    );
  }

  if (menuLoading || slotsLoading) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-6">
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
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6" data-testid="page-menu-selection">
      <Button 
        onClick={handleBack}
        variant="ghost" 
        className="mb-4"
        data-testid="button-back"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>
      
      {/* Restaurant Header */}
      <div className="text-center" data-testid="section-restaurant-header">
        <div 
          className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-cover bg-center shadow-lg border-4 border-white" 
          style={{ backgroundImage: `url('${state.selectedRestaurant.imageUrl}')` }}
        ></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="text-restaurant-name">
          {state.selectedRestaurant.name}
        </h2>
        <p className="text-secondary mb-2">{state.selectedRestaurant.description}</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Abierto ahora
          </span>
          <span>Desde {state.selectedRestaurant.priceFrom}€/persona</span>
        </div>
      </div>

      {/* Menu Tabs */}
      {menuItems && timeSlots && (
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Ver Menú</TabsTrigger>
            <TabsTrigger value="select">Hacer Reserva</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <MenuPreview menuItems={menuItems} />
          </TabsContent>
          
          <TabsContent value="select" className="mt-4">
            <MenuForm
              menuItems={menuItems}
              timeSlots={timeSlots}
              onContinue={handleContinue}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
