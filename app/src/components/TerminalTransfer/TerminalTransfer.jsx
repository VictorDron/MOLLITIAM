import React from 'react';

import './TerminalTransfer.css';

const TerminalTransfer = ({ polos, transferPolo, onTransferPoloChange, onTransferAmountChange, onTransferSubmit }) => {
  const handlePoloChange = (event) => {
    onTransferPoloChange(event.target.value);
  };

  const handleAmountChange = (event) => {
    onTransferAmountChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onTransferSubmit();
  };

  return (
    <div className="expediction">
      <div className="form">
        <select className="select_2" onChange={handlePoloChange} value={transferPolo}>
          <option value="">Selecione o polo de transferência</option>
          {polos.map((polo) => (
            <option key={polo.id} value={polo.id}>
              {polo.nome}
            </option>
          ))}
        </select>
        <br />
        <input type="text" placeholder="Quantidade" onChange={handleAmountChange} />
        <br />
        <button onClick={handleSubmit}>ENVIAR</button>
      </div>
    </div>
  );
};

export default TerminalTransfer;
