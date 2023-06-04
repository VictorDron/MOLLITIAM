// DangerLevelDisplay component
import React from 'react';

import './DangerLevelDisplay.css'

const DangerLevelDisplay = ({ dangerLevel }) => (

  <div className="critical">
    
    <div className={`critical_img ${dangerLevel ? dangerLevel.toLowerCase().replace(' ', '_') : ''}`}>
      <img src="logic.png" />
    </div>
   
  </div>

 
);

export default DangerLevelDisplay;
