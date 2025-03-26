import { useEffect, useState } from "react";
import { CheckBox } from "./components/CheckBox";

export const ToDoList = () => {
  const storedData = localStorage.getItem("items");
  const [inputTaskName, setInputTaskName] = useState("");
  const [inputTaskTime, setInputTaskTime] = useState("");
  const [inputTaskDate, setInputTaskDate] = useState("");
  const [taskList, setTaskList] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(taskList));
  }, [taskList]);

  let todayDate = new Date();

  const formateDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });
  };

  const ToggleCheckBox = (index, checked) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].checked = checked;
    setTaskList(updatedTasks);
  };

  const AddTask = () => {
    if (!inputTaskName) return;
    if (!inputTaskTime) return;
    if (!inputTaskDate) return;

    setTaskList([
      ...taskList,
      { name: inputTaskName, time: inputTaskTime, date: inputTaskDate },
    ]);
    setInputTaskName("");
    setInputTaskDate("");
    setInputTaskTime("");
  };

  const removeItem = (index) => {
    setTaskList(taskList.filter((_, i) => i != index));
  };

  const ToggleElement = (elementName, classStyleName) => {
    document.querySelector(elementName).classList.toggle(classStyleName);
  };

  return (
    <>
      <div className="mainBody">
        <h1>Today's Task</h1>
        <h2>{formateDate(todayDate)}</h2>
        <div className="container">
          <button
            className="mobileAddItemButton"
            onClick={() => ToggleElement(".itemAddBox", "popAddItem")}
          >
            Add Task
          </button>
        </div>

        <div className="container">
          <div className="itemAddBox">
            <div className="formContainer">
              <span
                className="closeItemAddBox"
                onClick={() => {
                  ToggleElement(".itemAddBox", "popAddItem");
                }}
              >
                X
              </span>
              <h1>Add Task</h1>
              <div className="addItemForm">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={inputTaskName}
                  onChange={(e) => setInputTaskName(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={inputTaskTime}
                  onChange={(e) => setInputTaskTime(e.target.value)}
                />

                <input
                  type="date"
                  placeholder="Date"
                  value={inputTaskDate}
                  onChange={(e) => setInputTaskDate(e.target.value)}
                />
                <button onClick={() => AddTask()}>Add to Task List</button>
              </div>
            </div>
          </div>
          <div className="itemList taskContainer">
            {taskList.map((task, index) => {
              return (
                <div
                  className="taskList"
                  key={index}
                  style={{
                    background: task.checked ? "green" : "orange",
                    textDecoration: task.checked ? "line-through" : "",
                  }}
                >
                  <div className="taskData taskNumber">{index + 1}</div>
                  <div className="taskData taskName">{task.name} </div>

                  <div className="taskData taskTime"> {task.time} </div>
                  <div className="taskData taskDone" name={`taskDone${index}`}>
                    <CheckBox
                      index={index}
                      checked={task.checked}
                      toggle={ToggleCheckBox}
                    />
                  </div>
                  <span
                    className="removeItem"
                    onClick={() => removeItem(index)}
                  >
                    X
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
