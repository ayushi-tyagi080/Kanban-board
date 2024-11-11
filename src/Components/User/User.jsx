import React from "react";
import { useNavigate } from "react-router-dom"; 
import './User.css';
import { MoreHorizontal } from "react-feather";

const tickets = [
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
];

const users = [
  { id: "usr-1", name: "Anoop Sharma", available: false },
  { id: "usr-2", name: "Yogesh", available: true },
  { id: "usr-3", name: "Shankar Kumar", available: true },
  { id: "usr-4", name: "Ramesh", available: true },
  { id: "usr-5", name: "Suresh", available: true },
];

function User() {
  const navigate = useNavigate(); // Correct hook for navigation

  // Group tickets by userId
  const groupedTickets = users.map(user => {
    return {
      user,
      tickets: tickets.filter(ticket => ticket.userId === user.id)
    };
  });

  return (
    <div className="user-board">
      {groupedTickets.map(group => (
        <div key={group.user.id} className="user-card">
          <h3>{group.user.name}</h3>
          <MoreHorizontal />
          <div className="tickets-list">
            {group.tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <h4>{ticket.title}</h4>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default User;