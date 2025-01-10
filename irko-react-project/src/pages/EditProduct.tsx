import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../interface/type';

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
    console.log("Product Updated:", updatedProduct);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editProduct();
  };

  return (
    <div>
      <h1>Editar Produto {id}</h1>
      <form onSubmit={handleSubmit}>
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
