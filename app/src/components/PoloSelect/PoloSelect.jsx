// PoloSelect component
import React from 'react';

import './PoloSelect.css';

const PoloSelect = ({ polos, selectedPolo, onPoloChange }) => (
  <div className='select'>
    {/* Render a select input */}
    <select className='select_1' onChange={(e) => onPoloChange(e.target.value)} value={selectedPolo || undefined}>
      <option value="">Selecione um polo</option>
      {/* Render options for each polo */}
      {polos.map((polo) => (
        <option key={polo.id} value={polo.id}>
          {polo.nome}
        </option>
      ))}
    </select>
  </div>
);

export default PoloSelect;
