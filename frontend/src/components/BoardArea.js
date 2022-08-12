import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
import Form from "./Form";

export default function BoardArea() {
  const [taskList, setTaskList] = useState();

  const dragStarted = (e, taskId, status) => {
    const task = { _id: taskId, status };
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Drag Started");
  };

  const dragDropped = (e) => {
    let transferData = JSON.parse(e.dataTransfer.getData("task"));
    console.log("dragDropped", document.querySelector(".column").attributes.id);
  };

  const fetchData = async () => {
    let { data: tasks } = await getTasks();
    setTaskList(tasks);
  };

  const handleDragEnter = (e) => {
    console.log("handleDragEnter", e.target);
  };

  const handleDragLeave = (e) => {
    console.log("handleDragLeave", e.target);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='card'>
      <div className='card-body mt-5'>
        <Form taskList={taskList} setTaskList={setTaskList} />
        <div className='row'>
          <div className='col-md-12 mt-5'>
            <div className='board-area'>
              <div className='column' id='To Do'>
                <h1>To Do</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "To Do" && (
                      <div
                        key={task?._id}
                        draggable={true}
                        onDragStart={(e) => dragStarted(e, task._id, "To Do")}
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        className='item'
                      >
                        {task.title}
                      </div>
                    )
                )}
              </div>
              <div className='column' id='Progress'>
                <h1>In progress</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "Progress" && (
                      <div
                        key={task?._id}
                        draggable
                        onDragStart={(e) =>
                          dragStarted(e, task._id, "Progress")
                        }
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        className='item'
                      >
                        {task.title}
                      </div>
                    )
                )}
              </div>
              <div className='column' id='Completed'>
                <h1>Completed</h1>
                {taskList?.map(
                  (task) =>
                    task.status === "Completed" && (
                      <div
                        key={task?._id}
                        draggable
                        onDragStart={(e) =>
                          dragStarted(e, task._id, "Completed")
                        }
                        onDragOver={(e) => draggingOver(e)}
                        onDrop={(e) => dragDropped(e)}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        className='item'
                      >
                        {task.title}
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
