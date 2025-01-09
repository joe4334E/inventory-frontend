import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const InventoryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  // Función para validar el precio
  const isValidPrice = (price) => {
    // Validar si el precio es un número y mayor que 0
    const validPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    return !isNaN(validPrice) && validPrice > 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar precio antes de guardar
    if (!isValidPrice(formData.price)) {
      Swal.fire({
        icon: 'error',
        title: 'Precio no válido',
        text: 'El precio debe ser un número mayor que cero.',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    onSave(formData);
  };

  return (
    <form
      className="bg-white p-6 shadow-md rounded-lg space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center text-gray-700">
        {item.id === 0 ? 'Agregar Producto' : 'Editar Producto'}
      </h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Descripción</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Precio</label>
        <input
          type="text" // Cambiar a texto para permitir valores como "$20.00" o "20"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-sm"
          placeholder="Ejemplo: 20, 20.50, $15"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
