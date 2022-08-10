import React from "react";

export default function Item({ item }) {
  return (
    <div class="item" draggable="true">
      {item.name}
    </div>
  );
}
