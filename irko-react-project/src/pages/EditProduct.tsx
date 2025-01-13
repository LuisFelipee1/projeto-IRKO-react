import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../interface/type';
import Swal from 'sweetalert2';
import '../styles/editProduct.css'

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [validated, setValidated] = useState(false);

  const editProduct = async () => {

    const updatedProduct: Product = {
      id,
      name,
      description,
      price: parseFloat(price as string),
      imageUrl,
    };

    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    console.log("Product Updated:", updatedProduct);
  };

  const handleSubmit = async () => {
    await editProduct();
    Swal.fire("Prontinho, alterações salvas!", "", "success");
  };

  const animation = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!name || !price || !description || !imageUrl) {
      setValidated(true);
      return;
    }

    Swal.fire({
      title: "Você deseja salvar as alterações?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: `Não salvar`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
        navigate('/');
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("Alterações não salvas", "", "info");
      }
    });
  }

  return (
    <div className='all-body'>
      <button 
        className='btn-voltar' 
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
      <div className='form'>
        <form onSubmit={animation}>
        <h1>Editar Produto </h1>
          <label>
            Nome:
            <br />
            <input
              className='input-edit'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            {validated && !name && <span>Por favor, insira um nome.</span>}
          </label>
          <label>
            Descrição:
            <br />
            <input
              className='input-edit'
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            {validated && !name && <span>Por favor, insira uma descrição.</span>}
          </label>
          <label>
            Preço:
            <br />
            <input
              className='input-edit'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            {validated && !name && <span>Por favor, insira um valor.</span>}
          </label>
          <label>
            url da imagem:
            <br />
            <input
              className='input-edit'
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <br />
            {validated && !name && <span>Por favor, insira uma url válida.</span>}
          </label>
          <br />
          <button 
            type="submit" 
            className='btn-save'
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
