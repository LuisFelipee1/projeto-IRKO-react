import React, { useState, useEffect } from 'react';
import Product from '../interface/type';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/addProduct.css';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [validated, setValidated] = useState(false);

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

  const animation = async (e: React.FormEvent) => { 
    e.preventDefault();

    if (!name || !price || !description || !imageUrl) {
      setValidated(true);
      return;
    }

    try {
      await handleSubmit();
      navigate('/');
      window.location.reload();

      Swal.fire({
        title: "Pronto!",
        text: "Produto Adicionado com Sucesso!",
        imageUrl: "https://www.conjur.com.br/img/b/emoji-joinha.jpeg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
    } catch (error) {
      console.error("erro: ", error);
    }
  }

  return (
    <div className='all-body'>
      <button 
        className='btn-voltar' 
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
      <form className='form-add' onSubmit={animation}>
      <h1>Adicionar Produto</h1>
        <label>
          Nome:
          <br />
          <input
            type="text"
            className='input-add'
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
            className='input-add'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          {validated && !description && <span>Por favor, insira uma descrição.</span>}
        </label>
        <label>
          Preço:
          <br />
          <input
            className='input-add'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          {validated && !price && <span>Por favor, insira um preço.</span>}
        </label>
        <label>
          Url Imagem:
          <br />
          <input
            className='input-add'
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          {validated && !imageUrl && <span>Por favor, insira uma url de imagem.</span>}
        </label>
        <br />
        <button type="submit" className='btn-save-add'>Salvar</button>
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
