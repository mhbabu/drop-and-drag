import React from "react";

export default function Board(props) {

  const drop = (e) => {
    e.preventDefault();

    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    e.target.appendChild(card);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const toDoDiv = (e) => {
    console.log("eventlistener called");
  };

  const toDo = document.querySelector("#toDo");
  const progress = document.querySelector("#progress");
  const complete = document.querySelector("#complete");

  toDo?.addEventListener("onDrop", toDoDiv);

  return <div className={props.className} id={props.id} onDrop={drop} onDragOver={dragOver}>{props.children}</div>;
}
