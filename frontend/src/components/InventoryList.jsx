import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const InventoryList = ({ inventory, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cantidad</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {inventory.map((item) => {
            // Convertir item.price a un número, y si no es un número válido, poner 0.
            const price = parseFloat(item.price);
            const validPrice = isNaN(price) ? 0 : price;

            return (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">${validPrice.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-lg transition-colors"
                  >
                    <Edit className="inline" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition-colors"
                  >
                    <Trash2 className="inline" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
