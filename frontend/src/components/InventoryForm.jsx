import React, { useState, useEffect } from "react";
import { isValidPrice } from "../utils/priceutils";
import Swal from "sweetalert2";

const InventoryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidPrice(formData.price)) {
      Swal.fire({
        icon: "error",
        title: "Precio no válido",
        text: "El precio debe ser un número mayor que cero.",
        confirmButtonText: "Cerrar",
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
        {item.id === 0 ? "Agregar Producto" : "Editar Producto"}
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Descripción
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Precio
        </label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ejemplo: 20, 20.50, $15"
        />
      </div>

      {/* Selección del tipo de producto */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Tipo
        </label>
        <select
          name="type" 
          value={formData.type}
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="especial">Especial</option>
          <option value="regular">Regular</option>
          <option value="entrada">Entrada</option>
          <option value="promocion">Promoción</option>
        </select>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-all duration-200"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-700 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
