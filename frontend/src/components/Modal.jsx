import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Plus } from 'lucide-react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import { useInventory } from './hooks/useInventory';

const Modal = () => {
  const {
    inventory,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    fetchInventory,
  } = useInventory();

  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para controlar el modal

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddItem = async (item) => {
    await addItem(item);
    setIsModalOpen(false); // Cerrar modal después de agregar
  };

  const handleUpdateItem = async (item) => {
    await updateItem(item);
    setIsModalOpen(false); // Cerrar modal después de actualizar
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setIsModalOpen(false); // Cerrar modal después de eliminar
  };

  if (loading) return <div>Loading...</div>;

  if (error && error !== 'No tines productos') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Gestión de Inventario</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center justify-center max-w-xs mx-auto transition-all duration-200"
        onClick={() => {
          setEditingItem({ id: 0, name: '', description: '', price: '' });
          setIsModalOpen(true); // Abrir el modal cuando se agrega un artículo
        }}
      >
        <Plus className="mr-2" />
        Agregar Artículo
      </button>

      {inventory.length === 0 ? (
        <div className="text-center text-gray-500 mb-4">No hay productos. Agrega un producto.</div>
      ) : (
        <InventoryList
          inventory={inventory}
          onEdit={(item) => {
            setEditingItem(item);
            setIsModalOpen(true); // Abrir modal para editar el artículo
          }}
          onDelete={handleDeleteItem}
        />
      )}

      {/* Modal para agregar o editar productos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
            <InventoryForm
              item={editingItem}
              onSave={editingItem.id === 0 ? handleAddItem : handleUpdateItem}
              onCancel={() => setIsModalOpen(false)} // Cerrar el modal al cancelar
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
