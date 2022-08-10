import React from "react";
import Form from "./Form";

export default function BoardArea() {
  
  return (
    <div className="card">
      <div className="card-body mt-5">
        <Form/>
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="board-area">
              <div className="column">
                <h1>To Do</h1>
                <div className="item">Wash Clothes</div>
                <div className="item">Meeting at 9AM</div>
                <div className="item">Fix workshop</div>
                <div className="item">Visit the zoo</div>
              </div>
              <div className="column">
                <h1>In progress</h1>
              </div>
              <div className="column">
                <h1>Completed</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
