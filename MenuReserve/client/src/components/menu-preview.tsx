import { MenuItem } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Coffee, IceCream } from 'lucide-react';

interface MenuPreviewProps {
  menuItems: MenuItem[];
}

export default function MenuPreview({ menuItems }: MenuPreviewProps) {
  const primerPlatos = menuItems.filter(item => item.category === 'primer');
  const segundoPlatos = menuItems.filter(item => item.category === 'segundo');
  const postres = menuItems.filter(item => item.category === 'postre');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'primer':
        return <Utensils className="w-5 h-5" />;
      case 'segundo':
        return <Coffee className="w-5 h-5" />;
      case 'postre':
        return <IceCream className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'primer':
        return 'Primeros Platos';
      case 'segundo':
        return 'Segundos Platos';
      case 'postre':
        return 'Postres';
      default:
        return 'Platos';
    }
  };

  const renderMenuSection = (items: MenuItem[], category: string) => (
    <Card key={category} className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
          {getCategoryIcon(category)}
          <span className="ml-2">{getCategoryTitle(category)}</span>
          <Badge variant="secondary" className="ml-2 text-xs">
            {items.length} opciones
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid={`menu-item-${item.id}`}
            >
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
              </div>
              <span className="text-primary font-semibold">{item.price}€</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4" data-testid="menu-preview">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Vista Previa del Menú</h3>
        <p className="text-sm text-gray-600">Explora todas las opciones disponibles</p>
      </div>
      
      <div className="space-y-4">
        {primerPlatos.length > 0 && renderMenuSection(primerPlatos, 'primer')}
        {segundoPlatos.length > 0 && renderMenuSection(segundoPlatos, 'segundo')}
        {postres.length > 0 && renderMenuSection(postres, 'postre')}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-blue-800 mb-1">💡 Información</h4>
        <p className="text-sm text-blue-700">
          Selecciona un plato de cada categoría y tu horario preferido para completar tu reserva.
        </p>
      </div>
    </div>
  );
}