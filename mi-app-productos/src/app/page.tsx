"use client"; // Esta línea debe ser la primera en el archivo

import { useEffect, useState } from 'react';
import './styles.css'; // Importa el archivo CSS

export default function Home() {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState('');
  const [newProduct, setNewProduct] = useState({ code: '', name: '', price: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const searchProduct = async () => {
    const res = await fetch(`/api/products?code=${code}`);
    const data = await res.json();
    setProducts(data ? [data] : []);
  };

  const addProduct = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    fetchProducts();
    setNewProduct({ code: '', name: '', price: 0 });
  };

  return (
    <div className="container">
      <h1>Productos</h1>
      <input
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={searchProduct}>Buscar</button>
  
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <h2>Crear Producto</h2>
      <input
        placeholder="Código"
        value={newProduct.code}
        onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
      />
      <input
        placeholder="Nombre"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
      />
      <button onClick={addProduct}>Agregar</button>
    </div>
  );
  
}
