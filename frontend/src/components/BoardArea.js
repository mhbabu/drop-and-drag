import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import Form from "./Form";

export default function BoardArea() {
  const [taskList, setTaskList] = useState();

  const dragStarted = (e, id) => {
    console.log("Draging over now");
    e.dataTransfer.setData("todo", 'BABU');
  };

  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Drag Started");
  };

  const dragDropped = (e) => {
    console.log("You have dropped");
    let transferData = e.dataTransfer.getData("todo");
    console.log(transferData);
  };

  const fetchData = async () => {
    let { data: tasks } = await getTasks();
    setTaskList(tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-body mt-5">
        <Form taskList={taskList} setTaskList={setTaskList} />
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="board-area">
              <div className="column">
                <h1>To Do</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "To Do" && (
                      <div
                        key={task?._id}
                        draggable
                        onDragStart={(e) => dragStarted(e, task._id)}
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        className="item"
                      >
                        {task.name}
                      </div>
                    )
                )}
              </div>
              <div className="column">
                <h1>In progress</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "Progress" && (
                      <div
                        key={task?._id}
                        draggable
                        onDragStart={(e) => dragStarted(e, task._id)}
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        className="item"
                      >
                        {task.name}
                      </div>
                    )
                )}
              </div>
              <div className="column">
                <h1>Completed</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "Complete" && (
                      <div
                        key={task?._id}
                        draggable
                        onDragStart={(e) => dragStarted(e, task._id)}
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        className="item"
                      >
                        {task.name}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
