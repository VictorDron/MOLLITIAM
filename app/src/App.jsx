import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

import PoloSelect from './components/PoloSelect/PoloSelect';
import StockDisplay from './components/StockDisplay/StockDisplay';
import DangerLevelDisplay from './components/DangerLevelDisplay/DangerLevelDisplay';
import TerminalTransfer from './components/TerminalTransfer/TerminalTransfer';
import AdjustLevelButton from './components/AdjustLevelButton/AdjustLevelButton';

function App() {
  const [polos, setPolos] = useState([]);
  const [selectedPolo, setSelectedPolo] = useState(null);
  const [stockValue, setStockValue] = useState(0);
  const [dangerLevel, setDangerLevel] = useState(null);
  const [transferPolo, setTransferPolo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  
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

  useEffect(() => {
    const fetchDangerLevel = async (poloId) => {
      if (poloId) {
        try {
          const response = await axios.get(`http://localhost:3000/polos/search/${poloId}`);

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

    if (selectedPolo) {
      fetchDangerLevel(selectedPolo);
    }
  }, [selectedPolo]);

  const fetchStockValue = async (poloId) => {
    try {
      const response = await axios.get(`http://localhost:3000/polos/${poloId}`);
      if (response.data) {
        setStockValue(response.data.terminal_qtd);
      }
    } catch (error) {
      console.error('Error fetching stock value:', error);
    }
  };

  const handlePoloChange = (poloId) => {
    const selectedPolo = polos.find((polo) => polo.id === parseInt(poloId));
    setSelectedPolo(selectedPolo ? selectedPolo.id : null);
    setStockValue(selectedPolo ? selectedPolo.terminal_qtd : 0);
  };

  const handleAdjustLevelClick = async () => {
    if (selectedPolo) {
      try {
        await axios.post(`http://localhost:3000/polos/adjust/${selectedPolo}`);
        setDangerLevel('Cobertura ideal');
        fetchStockValue(selectedPolo);
      } catch (error) {
        console.error('Error on adjust level:', error);
      }
    }
  };

  const handleTransferPoloChange = (transferPoloId) => {
    setTransferPolo(transferPoloId);
  };

  const handleTransferAmountChange = (amount) => {
    setTransferAmount(amount);
  };

  const handleTransferSubmit = async () => {
    if (selectedPolo && transferPolo && transferAmount) {
      try {
        const response = await axios.post(`http://localhost:3000/polos/expedition`, {
          origem_id: selectedPolo,
          destino_id: transferPolo,
          terminal_qtd: parseInt(transferAmount),
        });
        await fetchStockValue(selectedPolo);
        if (response.status === 200) {
          await fetchPolos();
          setSelectedPolo(null);
          setTransferPolo('');
          setTransferAmount('');
          await fetchStockValue(transferPolo);
          await fetchDangerLevel(selectedPolo);
        }
      } catch (error) {
        console.error('Error on transfer:', error);
      }
    }
  };

  return (
    <>
      <div className="box_1">
        <PoloSelect polos={polos} selectedPolo={selectedPolo} onPoloChange={handlePoloChange} />
        <StockDisplay stockValue={stockValue} />
        <DangerLevelDisplay dangerLevel={dangerLevel} />
        <TerminalTransfer
          polos={polos}
          transferPolo={transferPolo}
          onTransferPoloChange={handleTransferPoloChange}
          onTransferAmountChange={handleTransferAmountChange}
          onTransferSubmit={handleTransferSubmit}
        />
        <AdjustLevelButton handleAdjustLevelClick={handleAdjustLevelClick} />
      </div>
    </>
  );
}

export default App;
