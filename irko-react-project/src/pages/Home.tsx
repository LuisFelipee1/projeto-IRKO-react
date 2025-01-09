import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../db.json';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(db.products);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button onClick={() => navigate('/add-product')}>Adicionar Produto</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
