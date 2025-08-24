import { useReservation } from '@/lib/reservation-context';

export default function OrderSummary() {
  const { state } = useReservation();

  if (!state.selectedRestaurant) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4" data-testid="card-order-summary">
      <div className="border-b border-gray-100 pb-4" data-testid="section-restaurant-info">
        <h3 className="font-semibold text-lg text-gray-900" data-testid="text-selected-restaurant-name">
          {state.selectedRestaurant.name}
        </h3>
        <p className="text-secondary text-sm" data-testid="text-selected-restaurant-description">
          {state.selectedRestaurant.description}
        </p>
      </div>

      <div className="space-y-3">
        {state.selectedItems.primer && (
          <div className="flex justify-between items-start" data-testid="summary-primer-plato">
            <div>
              <p className="font-medium text-gray-900">Primer Plato</p>
              <p className="text-sm text-secondary" data-testid="text-primer-name">
                {state.selectedItems.primer.name}
              </p>
            </div>
            <span className="font-medium text-gray-900" data-testid="text-primer-price">
              {state.selectedItems.primer.price}€
            </span>
          </div>
        )}

        {state.selectedItems.segundo && (
          <div className="flex justify-between items-start" data-testid="summary-segundo-plato">
            <div>
              <p className="font-medium text-gray-900">Segundo Plato</p>
              <p className="text-sm text-secondary" data-testid="text-segundo-name">
                {state.selectedItems.segundo.name}
              </p>
            </div>
            <span className="font-medium text-gray-900" data-testid="text-segundo-price">
              {state.selectedItems.segundo.price}€
            </span>
          </div>
        )}

        {state.selectedItems.postre && (
          <div className="flex justify-between items-start" data-testid="summary-postre">
            <div>
              <p className="font-medium text-gray-900">Postre</p>
              <p className="text-sm text-secondary" data-testid="text-postre-name">
                {state.selectedItems.postre.name}
              </p>
            </div>
            <span className="font-medium text-gray-900" data-testid="text-postre-price">
              {state.selectedItems.postre.price}€
            </span>
          </div>
        )}

        {state.selectedTimeSlot && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Horario</p>
                <p className="text-sm text-secondary">Mesa reservada</p>
              </div>
              <span className="font-medium text-primary" data-testid="text-selected-time">
                {state.selectedTimeSlot}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary" data-testid="text-total-price">
            {state.totalPrice.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}
