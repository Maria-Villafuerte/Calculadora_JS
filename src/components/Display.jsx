import React from 'react';
import './Display.css';

const Display = ({ value }) => (
  <div className="display" data-testid="display">
    {value || '0'}
  </div>
);

export default Display;
