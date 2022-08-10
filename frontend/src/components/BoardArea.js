import React, { useState, useEffect } from "react";
import Form from "./Form";
import { getTasks } from "../services/taskService";

export default function BoardArea() {
  const [taskList, setTaskList] = useState();

  const fetchData = async () => {
    let { data: tasks } = await getTasks();
    setTaskList(tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(taskList);

  return (
    <div className="card">
      <div className="card-body mt-5">
        <Form taskList={taskList} setTaskList={setTaskList}/>
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="board-area">
              <div className="column">
                <h1>To Do</h1>
                {taskList?.map((task) => (
                  <div key={task?._id??"asd"} className="item">
                    {task.name}
                  </div>
                ))}
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
