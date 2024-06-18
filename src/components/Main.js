import React from "react";
import { useState, useEffect } from "react";

function Main() {
  const [todos, settodos] = useState(() => {
    const storedTodos = window.localStorage.getItem("todoList");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [task, settask] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [taskInitiated, settaskInitiated] = useState(false);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    window.localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  function initTask() {
    settaskInitiated(true);
  }

  function addTask() {
    let date = new Date(dueDate);
    let fDate = date.toLocaleDateString("en", options);
    let taskArr = { task, fDate, status: false };
    settodos([...todos, taskArr]);

    settask("");
    setdueDate("");
    settaskInitiated(false);
  }

  function handleDelete(i) {
    todos.splice(i, 1);
    settodos([...todos]);
  }

  function taskCompleted(i) {
    let updatedTodos = todos.map((e, index) =>
      index === i ? { ...e, status: !e.status } : e
    );
    settodos(updatedTodos);
  }

  return (
    <div>
      <div className={taskInitiated ? "w-[360px] mx-auto mt-5" : "hidden"}>
        <div className="flex gap-2">
          <input
            className="w-[87%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
            type="text"
            value={task}
            placeholder="e.g. Learn Javascript"
            onChange={(e) => settask(e.target.value)}
          />
          <input
            className="w-[13%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setdueDate(e.target.value)}
          />
        </div>
        <button
          onClick={addTask}
          className="bg-black rounded-lg text-white px-5 py-3 text-sm font-light"
        >
          Add Task
        </button>
      </div>

      {todos.map((e, i) => (
        <div className="w-[360px] mx-auto mt-5 " key={i}>
          <div
            className={
              e.status
                ? "border border-green-300 bg-green-50 mb-3  rounded-xl p-3"
                : "border border-neutral-200 bg-neutral-0 mb-3  rounded-xl p-3"
            }
          >
            <p>{e.task}</p>
            <p className=" text-[14px] font-light  text-neutral-700">
              {e.fDate}
            </p>
            <div className="flex gap-4 ">
              <button
                onClick={() => taskCompleted(i)}
                className="text-neutral-400 hover:text-green-600 flex gap-3  mt-2 text-sm items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>{" "}
                Mark as done
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="text-neutral-400 hover:text-red-500 flex gap-3  mt-2 text-sm items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={initTask}
        className="fixed bottom-10 right-10 bg-black text-white w-12 flex rounded-full items-center justify-center h-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
    </div>
  );
}

export default Main;
