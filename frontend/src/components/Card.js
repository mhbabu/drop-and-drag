import React from "react";

export default function Card(props) {

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className='item'
      id={props.id}
      draggable={props.dragable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}
