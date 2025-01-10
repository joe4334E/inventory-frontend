import React from 'react';

const SearchComponent = ({ search, setSearch }) => {
  // Función de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mb-4 ">
      <input
        value={search}
        onChange={handleSearchChange}
        type="text"
        placeholder="Buscar Productos"
        className="form-control w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchComponent;
