import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // States for storing data
  const [polos, setPolos] = useState([]);
  const [selectedPolo, setSelectedPolo] = useState(null);
  const [stockValue, setStockValue] = useState(0);
  const [dangerLevel, setDangerLevel] = useState(null);
  const [transferPolo, setTransferPolo] = useState(null);
  const [transferAmount, setTransferAmount] = useState(0);

  // Fetch all polos on component mount
  useEffect(() => {
    const fetchPolos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/polos');
        setPolos(response.data);
      } catch (error) {
        console.error('Error fetching polos:', error);
      }
    };

    fetchPolos();
  }, []);

  // Fetch danger level of selected polo
  useEffect(() => {
    const fetchDangerLevel = async () => {
      if (selectedPolo) {
        try {
          const response = await axios.get(`http://localhost:3000/polos/search/${selectedPolo}`);

          if (Array.isArray(response.data) && response.data.length > 0) {
            setDangerLevel(response.data[0].level);
          } else {
            setDangerLevel(null);
          }
        } catch (error) {
          console.error('Error fetching danger level:', error);
        }
      }
    };

    fetchDangerLevel();
  }, [selectedPolo]);

  // Event handler for selecting a polo
  const handlePoloChange = (event) => {
    const selectedPolo = polos.find((polo) => polo.id === parseInt(event.target.value));
    setSelectedPolo(selectedPolo ? selectedPolo.id : null);
    setStockValue(selectedPolo ? selectedPolo.terminal_qtd : 0);
  };

  // Event handler for adjusting the stock level of selected polo
  const handleAdjustLevelClick = async () => {
    if (selectedPolo) {
      try {
        await axios.post(`http://localhost:3000/polos/adjust/${selectedPolo}`);

        const updatedPoloResponse = await axios.get(`http://localhost:3000/polos/${selectedPolo}`);
        if (updatedPoloResponse.data) {
          setStockValue(updatedPoloResponse.data.terminal_qtd);
        }

        fetchDangerLevel(selectedPolo);
      } catch (error) {
        console.error('Error on adjust level:', error);
      }
    }
  };

  // Event handler for selecting a polo to transfer terminals
  const handleTransferPoloChange = (event) => {
    const selectedPolo = polos.find((polo) => polo.id === parseInt(event.target.value));
    setTransferPolo(selectedPolo ? selectedPolo.id : null);
  };

  // Event handler for entering the transfer amount
  const handleTransferAmountChange = (event) => {
    setTransferAmount(parseInt(event.target.value) || 0);
  };

  // Event handler for submitting the terminal transfer
  const handleTransferSubmit = async (event) => {
    event.preventDefault();

    if (selectedPolo && transferPolo && transferAmount > 0) {
      try {
        const response = await axios.post(`http://localhost:3000/polos/expedition`, {
          origem_id: selectedPolo,
          destino_id: transferPolo,
          terminal_qtd: transferAmount,
        });

        if (response.status === 200) {
          // Update polos data after successful transfer
          fetchPolos();
        }
      } catch (error) {
        console.error('Error on transfer:', error);
      }
    }
  };

  return (
    <>
      <div className="box_1">
        <div className="select">
          {/* Select input for choosing a polo */}
          <select name="" className="select_1" onChange={handlePoloChange}>
            {polos.map((polo) => (
              <option key={polo.id} value={polo.id}>
                {polo.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="title_stock">
          <h1>ESTOQUE</h1>
        </div>
        <div className="stock_value">
          <h1 className="stock_result">{stockValue}</h1>
        </div>
        <div className="title_critical">
          <h1 className={`title_level ${dangerLevel ? dangerLevel.toLowerCase().replace(' ', '_') : ''}`}>
            {dangerLevel}
          </h1>
        </div>
        <div className="critical">
          <div className={`critical_img ${dangerLevel ? dangerLevel.toLowerCase().replace(' ', '_') : ''}`}>
            <img src="/logic.png" alt="Critical Image" />
          </div>
        </div>
        <div className="title_expediction">
          <h1>SELECIONE PARA EXPEDIR</h1>
        </div>

        <div className="expediction">
          {/* Form for transferring terminals */}
          <form onSubmit={handleTransferSubmit}>
            <select className="select_2" onChange={handleTransferPoloChange}>
              {polos.map((polo) => (
                <option key={polo.id} value={polo.id}>
                  {polo.nome}
                </option>
              ))}
            </select>
            <br />
            <input type="text" placeholder="QUANTIDADE" onChange={handleTransferAmountChange} />
            <br />
            <button type="submit">ENVIAR</button>
          </form>
        </div>

        <div className="adjust_level">
          {/* Button for adjusting the stock level */}
          <button onClick={handleAdjustLevelClick} className="action_level">
            AJUSTAR COBERTURA
          </button>
        </div>
        <div className="history"></div>
      </div>
    </>
  );
}

export default App;
