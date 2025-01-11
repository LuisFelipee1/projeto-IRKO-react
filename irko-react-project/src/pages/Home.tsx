import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../db.json';
import Swal from 'sweetalert2';
import Navbar from '../components/NavBar';
import '../styles/home.css';

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
      <h1 className='m-5 text-center'>Lista de Produtos</h1>
      <Navbar />
      <div className='container m-5 text-center'>
        {products.map((product) => (
          <div key={product.id} className='justify-content-center card-shirt m-3'>
            <img src={product.imageUrl} alt={product.id} className='image'/>
            <div className='fw-bold m-1'>{product.name}</div>
            <div className='m-1'>R$ {product.price},00</div>
            <button className='m-1 btn-edit' onClick={() => navigate(`/edit-product/${product.id}`)}>Editar</button>
            <button className='m-1 btn-excluir' onClick={(event) => animation(event, product.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
