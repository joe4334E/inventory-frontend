import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProductActions = ({ item, onEdit, onDelete }) => {
  return (
    <div>
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
    </div>
  );
};

export default ProductActions;
