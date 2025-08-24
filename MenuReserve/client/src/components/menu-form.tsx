import { useState, useEffect } from 'react';
import { MenuItem, TimeSlot } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useReservation } from '@/lib/reservation-context';

interface MenuFormProps {
  menuItems: MenuItem[];
  timeSlots: TimeSlot[];
  onContinue: () => void;
}

export default function MenuForm({ menuItems, timeSlots, onContinue }: MenuFormProps) {
  const { state, dispatch } = useReservation();
  const [selections, setSelections] = useState({
    primer: '',
    segundo: '',
    postre: '',
    timeSlot: ''
  });

  const primerPlatos = menuItems.filter(item => item.category === 'primer');
  const segundoPlatos = menuItems.filter(item => item.category === 'segundo');
  const postres = menuItems.filter(item => item.category === 'postre');

  const handleSelectionChange = (category: 'primer' | 'segundo' | 'postre', value: string) => {
    const menuItem = menuItems.find(item => item.id === value);
    if (menuItem) {
      dispatch({ type: 'SET_MENU_ITEM', payload: { category, item: menuItem } });
      setSelections(prev => ({ ...prev, [category]: value }));
    }
  };

  const handleTimeSlotChange = (value: string) => {
    dispatch({ type: 'SET_TIME_SLOT', payload: value });
    setSelections(prev => ({ ...prev, timeSlot: value }));
  };

  const isFormValid = selections.primer && selections.segundo && selections.postre && selections.timeSlot;

  return (
    <form className="space-y-6" data-testid="form-menu-selection">
      {/* Primer Plato */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-utensils text-primary mr-2"></i>Primer Plato
        </label>
        <Select 
          value={selections.primer} 
          onValueChange={(value) => handleSelectionChange('primer', value)}
          data-testid="select-primer-plato"
        >
          <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white">
            <SelectValue placeholder="Selecciona tu primer plato" />
          </SelectTrigger>
          <SelectContent>
            {primerPlatos.map((item) => (
              <SelectItem key={item.id} value={item.id} data-testid={`option-primer-${item.id}`}>
                {item.name} - {item.price}€
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Segundo Plato */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-drumstick-bite text-primary mr-2"></i>Segundo Plato
        </label>
        <Select 
          value={selections.segundo} 
          onValueChange={(value) => handleSelectionChange('segundo', value)}
          data-testid="select-segundo-plato"
        >
          <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white">
            <SelectValue placeholder="Selecciona tu segundo plato" />
          </SelectTrigger>
          <SelectContent>
            {segundoPlatos.map((item) => (
              <SelectItem key={item.id} value={item.id} data-testid={`option-segundo-${item.id}`}>
                {item.name} - {item.price}€
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Postre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-ice-cream text-primary mr-2"></i>Postre
        </label>
        <Select 
          value={selections.postre} 
          onValueChange={(value) => handleSelectionChange('postre', value)}
          data-testid="select-postre"
        >
          <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white">
            <SelectValue placeholder="Selecciona tu postre" />
          </SelectTrigger>
          <SelectContent>
            {postres.map((item) => (
              <SelectItem key={item.id} value={item.id} data-testid={`option-postre-${item.id}`}>
                {item.name} - {item.price}€
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Horario */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-clock text-primary mr-2"></i>Horario de Reserva
        </label>
        <Select 
          value={selections.timeSlot} 
          onValueChange={handleTimeSlotChange}
          data-testid="select-time-slot"
        >
          <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white">
            <SelectValue placeholder="Selecciona el horario" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot.id} value={slot.time} data-testid={`option-time-${slot.id}`}>
                {slot.time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>Política de Cancelación
        </h4>
        <p className="text-sm text-amber-700">
          Cancelación permitida hasta las 10:00h con devolución del 80%. 
          Opción de 100% en crédito para otra reserva.
        </p>
      </div>

      {/* Continue Button */}
      <Button 
        type="button"
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" 
        disabled={!isFormValid}
        onClick={onContinue}
        data-testid="button-continue-payment"
      >
        Continuar al Resumen
      </Button>
    </form>
  );
}
