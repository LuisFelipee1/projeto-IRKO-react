import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../interface/type';
import Swal from 'sweetalert2';

const EditProduct: React.FC = () => {
  const { id } = useParams<string>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

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
    Swal.fire({
      title: "Você deseja salvar as alterações?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: `Não salvar`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
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
        </label>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          url da imagem:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditProduct;
