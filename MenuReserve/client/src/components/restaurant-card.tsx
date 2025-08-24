import { Restaurant } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Star } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div 
      className="restaurant-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
      data-testid={`card-restaurant-${restaurant.id}`}
    >
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ backgroundImage: `url('${restaurant.imageUrl}')` }}
      >
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium text-green-600 shadow-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            {restaurant.isOpen === "true" ? "Abierto" : "Cerrado"}
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black/70 text-white rounded-lg px-2 py-1 text-xs font-medium">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
            {restaurant.rating}
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1" data-testid={`text-restaurant-name-${restaurant.id}`}>
            {restaurant.name}
          </h3>
          <p className="text-secondary text-sm" data-testid={`text-restaurant-description-${restaurant.id}`}>
            {restaurant.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600" data-testid={`text-price-from-${restaurant.id}`}>
              Desde {restaurant.priceFrom}€ por persona
            </span>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              Reserva disponible
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onClick}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
          data-testid={`button-view-menu-${restaurant.id}`}
        >
          Ver Menú y Reservar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
