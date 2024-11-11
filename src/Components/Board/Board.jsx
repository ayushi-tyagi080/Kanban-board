import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board({ title, board, addCard, removeBoard, removeCard, dragEntered, dragEnded, updateCard }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditable, setShowEditable] = useState(false);

  const handleAddClick = () => {
    setShowEditable(true);
  };

  const handleAddCard = (value) => {
    addCard(board.id, value);
    setShowEditable(false); 
  };

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {title} <span>({board.cards.length})</span>
        </p>
        <div className="board_header_controls">
          
          <div className="board_add-card" onClick={handleAddClick}>+</div>
          <div className="board_header_title_more" onClick={() => setShowDropdown(true)}>
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown class="board_dropdown" onClose={() => setShowDropdown(false)}>
                <p onClick={removeBoard}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {board.cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={board.id}
            removeCard={removeCard}
            dragEntered={dragEntered}
            dragEnded={dragEnded}
            updateCard={updateCard}
          />
        ))}

        {showEditable && (
          <Editable
            text="Enter Card Title"
            placeholder="Enter Card Title"
            displayClass="board_add-card"
            editClass="board_add-card_edit"
            onSubmit={handleAddCard}
          />
        )}
      </div>
    </div>
  );
}

export default Board;
