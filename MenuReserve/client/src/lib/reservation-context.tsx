import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Restaurant, MenuItem } from '@shared/schema';

interface ReservationState {
  selectedRestaurant: Restaurant | null;
  selectedItems: {
    primer: MenuItem | null;
    segundo: MenuItem | null;
    postre: MenuItem | null;
  };
  selectedTimeSlot: string | null;
  totalPrice: number;
}

type ReservationAction =
  | { type: 'SET_RESTAURANT'; payload: Restaurant }
  | { type: 'SET_MENU_ITEM'; payload: { category: 'primer' | 'segundo' | 'postre'; item: MenuItem } }
  | { type: 'SET_TIME_SLOT'; payload: string }
  | { type: 'CALCULATE_TOTAL' }
  | { type: 'RESET' };

const initialState: ReservationState = {
  selectedRestaurant: null,
  selectedItems: {
    primer: null,
    segundo: null,
    postre: null,
  },
  selectedTimeSlot: null,
  totalPrice: 0,
};

function reservationReducer(state: ReservationState, action: ReservationAction): ReservationState {
  switch (action.type) {
    case 'SET_RESTAURANT':
      return {
        ...state,
        selectedRestaurant: action.payload,
        selectedItems: { primer: null, segundo: null, postre: null },
        selectedTimeSlot: null,
        totalPrice: 0,
      };
    case 'SET_MENU_ITEM':
      const newSelectedItems = {
        ...state.selectedItems,
        [action.payload.category]: action.payload.item,
      };
      const newTotal = Object.values(newSelectedItems)
        .filter(Boolean)
        .reduce((sum, item) => sum + parseFloat(item!.price), 0);
      return {
        ...state,
        selectedItems: newSelectedItems,
        totalPrice: newTotal,
      };
    case 'SET_TIME_SLOT':
      return {
        ...state,
        selectedTimeSlot: action.payload,
      };
    case 'CALCULATE_TOTAL':
      const total = Object.values(state.selectedItems)
        .filter(Boolean)
        .reduce((sum, item) => sum + parseFloat(item!.price), 0);
      return {
        ...state,
        totalPrice: total,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const ReservationContext = createContext<{
  state: ReservationState;
  dispatch: React.Dispatch<ReservationAction>;
} | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}
