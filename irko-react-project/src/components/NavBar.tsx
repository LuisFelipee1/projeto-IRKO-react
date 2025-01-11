import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <nav className='text-center'>
      <button onClick={() => Navigate('/')}>Lista de Produtos</button>
      <button onClick={() => Navigate('/add-product')}>Adicionar Produto</button>
    </nav>
  );
}

export default Navbar;
