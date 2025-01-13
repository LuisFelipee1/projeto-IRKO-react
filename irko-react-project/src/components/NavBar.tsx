import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <nav className='text-center'>
      <button className='btn-navbar m-3' onClick={() => Navigate('/add-product')}>Adicionar Produto</button>
    </nav>
  );
}

export default Navbar;
