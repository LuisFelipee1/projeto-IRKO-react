import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../db.json';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(db.products);

  const deleteProduct = async (id: string | number) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error('Erro ao deletar produto');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button onClick={() => navigate('/add-product')}>Adicionar Produto</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Editar</button>
            <button onClick={() => deleteProduct(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
