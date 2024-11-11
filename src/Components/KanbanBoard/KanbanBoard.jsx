import React from "react";
import Board from "../Board/Board";
import "./KanbanBoard.css";

function KanbanBoard({ data, addCard, removeBoard, removeCard, dragEntered, dragEnded, updateCard }) {
  const columns = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div key={column} className="column-container">
         
          <input type="radio" id={column} name="column" value={column} />

          <Board
            title={column}
            board={{
              title: column,
              cards: data.tickets.filter((ticket) => ticket.status === column),
            }}
            addCard={addCard}
            removeBoard={removeBoard}
            removeCard={removeCard}
            dragEntered={dragEntered}
            dragEnded={dragEnded}
            updateCard={updateCard}
          />
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
