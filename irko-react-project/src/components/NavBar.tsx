import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Lista de Produtos</Link></li>
        <li><Link to="/add-product">Adicionar Produto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
