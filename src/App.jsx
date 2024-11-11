import React, { useEffect, useState } from "react";
import KanbanBoard from "./Components/KanbanBoard/KanbanBoard";
import Board from "./Components/Board/Board";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Editable from "./Components/Editabled/Editable";
import DisplayButton from "./Components/DisplayButton/DisplayButton";
import User from "./Components/User/User";
import Priority from "./Components/Priority/Priority";

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const data = {
    tickets: [
    { id: "CAM-1", title: "Update User Profile Page UI", tag: ["Feature request"], userId: "usr-1", status: "Todo", priority: 4 },
    { id: "CAM-2", title: "Add Multi-Language Support", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 3 },
    { id: "CAM-3", title: "Optimize Database Queries", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 1 },
    { id: "CAM-4", title: "Implement Email Notification System", tag: ["Feature Request"], userId: "usr-1", status: "In progress", priority: 3 },
    { id: "CAM-5", title: "Enhance Search Functionality", tag: ["Feature Request"], userId: "usr-5", status: "In progress", priority: 0 },
    { id: "CAM-6", title: "Third-Party Payment Gateway", tag: ["Feature Request"], userId: "usr-2", status: "Todo", priority: 1 },
    { id: "CAM-7", title: "Create Onboarding Tutorial", tag: ["Feature Request"], userId: "usr-1", status: "Backlog", priority: 2 },
    { id: "CAM-8", title: "Implement Role-Based Access Control", tag: ["Feature Request"], userId: "usr-3", status: "In progress", priority: 3 },
    { id: "CAM-9", title: "Upgrade Server Infrastructure", tag: ["Feature Request"], userId: "usr-5", status: "Todo", priority: 2 },
    { id: "CAM-10", title: "Conduct Security Vulnerability Assessment", tag: ["Feature Request"], userId: "usr-4", status: "Backlog", priority: 1 },
  ],
  users: [
    { id: "usr-1", name: "Anoop Sharma", available: false },
    { id: "usr-2", name: "Yogesh", available: true },
    { id: "usr-3", name: "Shankar Kumar", available: true },
    { id: "usr-4", name: "Ramesh", available: true },
    { id: "usr-5", name: "Suresh", available: true },
  ],
  }
  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

   return (
    <Router>
      <div className="app">
        <div className="app_nav">
          <DisplayButton />
        </div>
        
          <Routes>
            {/* Route for User Component */}
            <Route path="/user" element={<User />} />
            <Route path="/priority" element={<Priority />} />
            {/* Route for KanbanBoard with data */}
            <Route
              path="/"
              element={
                <>
                  <KanbanBoard data={data} />
                  <div className="app_boards">
                    {/* {boards.map((item) => (
                      <Board
                        key={item.id}
                        board={item}
                        addCard={addCardHandler}
                        removeBoard={() => removeBoard(item.id)}
                        removeCard={removeCard}
                        dragEnded={dragEnded}
                        dragEntered={dragEntered}
                        updateCard={updateCard}
                      />
                    ))} */}
                    <div className="app_boards_last">
                      {/* <Editable
                        displayClass="app_boards_add-board"
                        editClass="app_boards_add-board_edit"
                        placeholder="Enter Board Name"
                        text="Add Board"
                        buttonText="Add Board"
                        onSubmit={addboardHandler}
                      /> */}
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      
    </Router>
  );
}

export default App;