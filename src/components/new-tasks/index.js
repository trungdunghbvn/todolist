import React, { useState, useCallback, useContext } from "react";
import { TodoContext } from "../../utilities/context";
import { getDateNow, formatDate } from "../../utilities/date";
import { uniqueId } from "../../utilities/uid";
import { Button } from "../../common/Button";

import calendar from "../../assets/images/calendar.png";

export default function NewTasks() {
  const { dispatch } = useContext(TodoContext);

  const [nameTask, setNameTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [dateTask, setDateTask] = useState(getDateNow());
  const [piorityTask, setPiorityTask] = useState("normal");

  const handleChange = useCallback((e, callback) => {
    callback(e.target.value);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const data = {
      id: uniqueId(),
      name: nameTask,
      description: descriptionTask,
      date: dateTask,
      piority: piorityTask,
    };
    
    dispatch({ type: "ADD_TO_DO_LIST", value: data });

    setNameTask("");
    setDescriptionTask("");
    setDateTask(getDateNow());
    setPiorityTask("normal");
  };

  return (
    <div className="new-task">
      <h1 className="title">New Task</h1>
      <form onSubmit={addTask}>
        <input
          placeholder="Add new task ..."
          type="text"
          onChange={(e) => handleChange(e, setNameTask)}
          value={nameTask}
          required
        />
        <div className="label">Description</div>
        <textarea
          onChange={(e) => handleChange(e, setDescriptionTask)}
          value={descriptionTask}
        />
        <div className="group-option">
          <div className="item-option">
            <div className="label">Due Date</div>
            <div className="item-date">
              <span>{formatDate(new Date(dateTask))}</span>
              <img alt="calendar" src={calendar} />
            </div>
            <input
              type="date"
              min={getDateNow()}
              value={dateTask}
              onChange={(e) => handleChange(e, setDateTask)}
            />
          </div>
          <div className="item-option">
            <div className="label">Piority</div>
            <select
              value={piorityTask}
              onChange={(e) => handleChange(e, setPiorityTask)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <Button fullWidth success submit class="btn-add">
          Add
        </Button>
      </form>
    </div>
  );
}
