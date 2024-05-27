import React from 'react';
import './Display.css';

const Display = ({ value }) => 
<div className="display">{value || '0'}</div>;

export default Display;
