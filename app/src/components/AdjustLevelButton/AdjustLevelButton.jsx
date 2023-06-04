// AdjustLevelButton component
import React from 'react';

import './AdjustLevelButton.css';

const AdjustLevelButton = ({ handleAdjustLevelClick }) => (
  <div className="adjust_level">
    <button onClick={handleAdjustLevelClick} className="action_level">
      AJUSTAR COBERTURA
    </button>
  </div>
);

export default AdjustLevelButton;
