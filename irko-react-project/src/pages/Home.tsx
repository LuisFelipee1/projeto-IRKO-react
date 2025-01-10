import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../db.json';
import Swal from 'sweetalert2';

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

  const animation = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    Swal.fire({
      title: "Tem certeza que deseja excluir esse produto ?",
      text: "Você não pode reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado !",
          text: "Seu produto foi deletado com sucesso.",
          icon: "success"
        });
        deleteProduct(id);
      }
    });
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
            <button onClick={(event) => animation(event, product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
