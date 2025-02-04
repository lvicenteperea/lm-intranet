// src/components/Menu/Menu.jsx
import React from 'react';
import './Menu.css';

const Menu = ({ options }) => {
  return (
    <div className="menu">
      {options.map((option, index) => (
        <button key={index} onClick={option.action}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Menu;