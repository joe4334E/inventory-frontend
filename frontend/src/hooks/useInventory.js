// hooks/useInventory.js
import { useState, useCallback } from 'react';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3003/api/products');
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      if (data.length === 0) {
        setError('No products found'); // Esto lo manejamos en el componente App
      } else {
        setInventory(data);
        setError(null); // Limpia el error si hay productos
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = async (item) => {
    try {
      const response = await fetch('http://localhost:3003/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const newItem = await response.json();
        setInventory((prev) => [...prev, newItem]);
      } else {
        throw new Error('Error al agregar producto');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/products/${updatedItem.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        setInventory((prev) =>
          prev.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item
          )
        );
      } else {
        throw new Error('Error al actualizar el producto');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInventory((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    inventory,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    fetchInventory,
  };
};
