import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Plus } from 'lucide-react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  // Obtener los productos desde el backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        setError(error.message); // Captura el error
      } finally {
        setLoading(false); // Deja de cargar una vez que terminamos
      }
    };

    fetchInventory();
  }, []);

  // Función para validar precio
  const isValidPrice = (price) => {
    const validPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    return !isNaN(validPrice) && validPrice > 0;
  };

  const addItem = async (item) => {
    if (!isValidPrice(item.price)) {
      Swal.fire({
        icon: 'error',
        title: 'Precio no válido',
        text: 'El precio debe ser un número mayor que cero.',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    try {
      const price = parseFloat(item.price.replace(/[^\d.-]/g, '')); // Formatear precio
      const response = await fetch('http://localhost:3003/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...item, price }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setInventory([...inventory, newItem]);
        Swal.fire({
          icon: 'success',
          title: 'Producto Agregado',
          text: 'El producto ha sido agregado correctamente.',
          confirmButtonText: 'Cerrar',
        });
      } else {
        throw new Error('Error al agregar el producto');
      }
    } catch (error) {
      setError(error.message); // Captura el error
    }
  };

  const updateItem = async (updatedItem) => {
    if (!isValidPrice(updatedItem.price)) {
      Swal.fire({
        icon: 'error',
        title: 'Precio no válido',
        text: 'El precio debe ser un número mayor que cero.',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    try {
      const price = parseFloat(updatedItem.price.replace(/[^\d.-]/g, '')); // Formatear precio
      const response = await fetch(`http://localhost:3003/api/products/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedItem, price }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setInventory(inventory.map(item => item.id === updatedProduct.id ? updatedProduct : item));
        setEditingItem(null);
        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          text: 'El producto ha sido actualizado correctamente.',
          confirmButtonText: 'Cerrar',
        });
      } else {
        throw new Error('Error al actualizar el producto');
      }
    } catch (error) {
      setError(error.message); // Captura el error
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInventory(inventory.filter(item => item.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Producto Eliminado',
          text: 'El producto ha sido eliminado correctamente.',
          confirmButtonText: 'Cerrar',
        });
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      setError(error.message); // Captura el error
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje mientras los datos están cargando
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra un mensaje de error si algo sale mal
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Inventario</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
        onClick={() => setEditingItem({ id: 0, name: '', description: '', price: '' })}
      >
        <Plus className="mr-2" />
        Agregar Artículo
      </button>
      <InventoryList
        inventory={inventory}
        onEdit={setEditingItem}
        onDelete={deleteItem}
      />
      {editingItem && (
        <InventoryForm
          item={editingItem}
          onSave={editingItem.id === 0 ? addItem : updateItem}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default App;
