const API_URL = 'http://localhost:3003/api/products';

export const api = {
  getInventory: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
  },
  addProduct: async (product) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error al agregar producto');
    return response.json();
  },
  updateProduct: async (product) => {
    const response = await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return response.json();
  },
  deleteProduct: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
  },
};
