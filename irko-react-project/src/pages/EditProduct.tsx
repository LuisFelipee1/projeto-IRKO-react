import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Tipagem para o parâmetro id
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');

  useEffect(() => {
    // Aqui você pode buscar o produto pelo ID para editar
    console.log(`Editando o produto com ID: ${id}`);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para salvar as alterações do produto
    console.log({ name, description, price });
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditProduct;
