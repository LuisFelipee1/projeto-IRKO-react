import React, { useState, useEffect } from 'react';
import Product from '../interface/type';
import Swal from 'sweetalert2';
import gif from '../assets/gifs/meebo-smurfs.mp4';

const AddProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState<number | string>('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    const newProduct: Product = {
      id: (Math.floor(Math.random() * 10000) + 1).toString(),
      name,
      price: parseFloat(price as string),
      description,
      imageUrl,
    };

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);

      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  const animation = (e: React.FormEvent) => { 
    e.preventDefault();
    Swal.fire({
      title: "Produto adicionado com sucesso .",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("../assets/gifs/meebo-smurfs.mp4")  
        left top
        no-repeat
      `
    });
    handleSubmit();
  }

  return (
    <div>
      <h1>Adicionar Produto</h1>
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
          Url Imagem:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit">Salvar</button>
      </form>

      <h2>Produtos Cadastrados</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProduct;
