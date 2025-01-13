import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../interface/type';
import Swal from 'sweetalert2';

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
      } else if (result.isDenied) {
        Swal.fire("Alterações não salvas", "", "info");
      }
    });
  }

  return (
    <div>
      <h1>Editar Produto {id}</h1>
      <form onSubmit={animation}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validated && !name && <span>Por favor, insira um nome.</span>}
        </label>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {validated && !name && <span>Por favor, insira um nome.</span>}
        </label>
        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {validated && !name && <span>Por favor, insira um nome.</span>}
        </label>
        <label>
          url da imagem:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {validated && !name && <span>Por favor, insira um nome.</span>}
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditProduct;
