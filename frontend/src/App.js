import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Card from "./components/Card";
import Form from "./components/Form";
import { getTasks } from "./services/taskService";

function App() {
  const [taskList, setTaskList] = useState();

  const fetchData = async () => {
    let { data: tasks } = await getTasks();
    setTaskList(tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App mt-4'>
      <Form taskList={taskList} setTaskList={setTaskList} />
      <div className='flex'>
        <h3 className='ml-0 mx-0'>To Do</h3>
        <h3 className='ml-5 mr-5 mx-0'>In Progress</h3>
        <h3 className='ml-5 mr-5 mx-0'>Done</h3>
      </div>
      <div className='flexbox'>
        <Board className='board to-do' id='toDo'>
          {taskList?.map(
            (task) =>
              task.status === "To Do" && (
                <Card
                  key={task?._id}
                  id={task?._id}
                  className='card'
                  draggable='true'
                >
                  <p>{task?.title}</p>
                </Card>
              )
          )}
        </Board>

        <Board className='board' id='progress'>
          {taskList?.map(
            (task) =>
              task.status === "Progress" && (
                <Card
                  key={task?._id}
                  id={task?._id}
                  className='card'
                  draggable='true'
                >
                  <p>{task?.title}</p>
                </Card>
              )
          )}
        </Board>

        <Board className='board' id='complete'>
          {taskList?.map(
            (task) =>
              task.status === "Completed" && (
                <Card
                  key={task?._id}
                  id={task?._id}
                  className='card'
                  draggable='true'
                >
                  <p>{task?.title}</p>
                </Card>
              )
          )}
        </Board>
      </div>
    </div>
  );
}

export default App;
