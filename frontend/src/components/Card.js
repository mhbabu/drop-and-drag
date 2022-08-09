import React from "react";

export default function Card(props) {

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const dragOver = e =>{
    e.stopPropagation();
  }


  return (
    <div
      className={props.className}
      id={props.id}
      draggable={props.dragable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}
