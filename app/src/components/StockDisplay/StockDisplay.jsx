// StockDisplay.js component
import React from 'react';

import './StockDisplay.css';


const StockDisplay = ({ stockValue }) => (

  <div className="stock_value">
    <h1 className="stock_result">{stockValue}</h1>
  </div>
);

export default StockDisplay;
