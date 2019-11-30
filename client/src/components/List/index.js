import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({ children, onClick, dataId }) {
  return <li className="list-group-item" data-id={dataId} onClick={onClick}>{children}</li>;
}
