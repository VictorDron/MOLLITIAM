// TerminalTransfer component
import React from 'react';

import './TerminalTransfer.css';

const TerminalTransfer = ({ polos, transferPolo, onTransferPoloChange, onTransferAmountChange, onTransferSubmit }) => {
  // Handle polo selection change
  const handlePoloChange = (event) => {
    onTransferPoloChange(event.target.value);
  };

  // Handle transfer amount change
  const handleAmountChange = (event) => {
    onTransferAmountChange(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onTransferSubmit();
  };

  return (
    <div className="expediction">
      <div className="form">
        {/* Render a select input for polo selection */}
        <select className="select_2" onChange={handlePoloChange} value={transferPolo}>
          <option value="">Selecione o polo de transferência</option>
          {/* Render options for each polo */}
          {polos.map((polo) => (
            <option key={polo.id} value={polo.id}>
              {polo.nome}
            </option>
          ))}
        </select>
        <br />
        {/* Render an input field for transfer amount */}
        <input type="text" placeholder="Quantidade" onChange={handleAmountChange} />
        <br />
        {/* Render a submit button */}
        <button onClick={handleSubmit}>ENVIAR</button>
      </div>
    </div>
  );
};

export default TerminalTransfer;
