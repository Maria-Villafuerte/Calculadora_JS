import React from 'react';
import './Button.css';

const Button = ({ label, onClick }) => (
  <button className="button" onClick={onClick} data-testid={`button-${label}`}>
    {label}
  </button>
);

export default Button;
