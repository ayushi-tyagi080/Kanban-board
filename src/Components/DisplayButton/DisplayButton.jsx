import { Sliders, ChevronDown } from "react-feather";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import "./DisplayButton.css";

function DisplayButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [showGrouping, setShowGrouping] = useState(false);  

  const navigate = useNavigate(); 

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleGrouping = () => {
    setShowGrouping(!showGrouping);
    navigate("/user");  
  };

    const navigateToPriorityBoard = () => {
    
    navigate("/priority", { state: { data: data } });
  };

  return (
    <div className="display-button-container">
      <button className="display-button" onClick={toggleOptions}>
        <Sliders className="icon" />
        Display
        <ChevronDown className="icon" />
      </button>
      {showOptions && (
        <div className="dropdown-menu">
          <p className="dropdown-item">
            Grouping
            <button className="dropdown-option-button" onClick={toggleGrouping}>
              Status
              <ChevronDown className="icon" />
            </button>
          </p>
          <p className="dropdown-item">
            Ordering
            <button className="dropdown-option-button" onClick={navigateToPriorityBoard}>
              Priority<ChevronDown className="icon" /></button>
          </p>
        </div>
      )}
    </div>
  );
}

export default DisplayButton;
