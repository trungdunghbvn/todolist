/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { TodoContext } from "../../utilities/context";
import { getDateNow, formatDate } from "../../utilities/date";
import calendar from "../../assets/images/calendar.png";
import { Button, Checkbox } from "../../common";

export default function ListTasks() {
  const { state, dispatch } = useContext(TodoContext);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [listCheckBox, setListCheckBox] = useState([]);
  const [listTasks, setListTasks] = useState([]);

  const [detail, setDetail] = useState(-1);

  const [nameTask, setNameTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [dateTask, setDateTask] = useState();
  const [piorityTask, setPiorityTask] = useState("normal");

  useEffect(() => {
    dispatch({ type: "GET_TO_DO_LIST" });
  }, []);

  useEffect(() => {
    const list = state.listTasks;
    list.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    if (search === "") {
      setListTasks(list);
      return;
    }

    const filterRegex = new RegExp(search, "i");
    const resultListTasks = list.filter((tasks) =>
      tasks.name.match(filterRegex)
    );
    setListTasks(resultListTasks);
  }, [state.listTasks, search]);

  useEffect(() => {
    if (listCheckBox.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [listCheckBox]);

  const handleChange = useCallback((e, callback) => {
    callback(e.target.value);
  }, []);

  const deleteBulkAction = () => {
    dispatch({ type: "BULK_DELETE_TO_DO_LIST", value: listCheckBox });
    setListCheckBox([]);
  };

  const handleCheckBox = (id) => {
    const indexOfList = [...listCheckBox];
    if (indexOfList.includes(id)) {
      indexOfList.splice(indexOfList.indexOf(id), 1);
    } else {
      indexOfList.push(id);
    }
    setListCheckBox(indexOfList);
  };

  const isChecked = (id) => {
    return listCheckBox.includes(id);
  };

  const openDetail = (item) => {
    setDetail(item.id);
    setNameTask(item.name);
    setDescriptionTask(item.description);
    setDateTask(item.date);
    setPiorityTask(item.piority);
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELETE_TO_DO_LIST", id });
  };

  const updateTask = (e, id) => {
    e.preventDefault();
    const task = {
      id,
      name: nameTask,
      description: descriptionTask,
      date: dateTask,
      piority: piorityTask,
    };
    dispatch({ type: "UPDATE_TASK", task });
    setDetail(-1);
  };

  return (
    <>
      <div className="list-tasks">
        <h1 className="title">To Do List</h1>
        <input
          placeholder="Search"
          onChange={(e) => handleChange(e, setSearch)}
          type="text"
          value={search}
        />
        <div className="to-do-list">
          {listTasks.length > 0 ? (
            listTasks.map((item, index) => (
              <div key={index}>
                <div className="to-do-list-item">
                  <Checkbox
                    onChange={() => handleCheckBox(item.id)}
                    label={item.name}
                    checked={isChecked(item.id)}
                  />
                  <div className="group-button">
                    <Button size="slim" info onClick={() => openDetail(item)}>
                      Detail
                    </Button>
                    <Button
                      size="slim"
                      destructive
                      onClick={() => deleteItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                {detail === item.id && (
                  <form
                    onSubmit={(e) => updateTask(e, item.id)}
                    className="form-update"
                  >
                    <input
                      placeholder="Name task ..."
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
                    <Button fullWidth success submit>
                      Update
                    </Button>
                  </form>
                )}
              </div>
            ))
          ) : (
            <h3 className="notfound">No tasks exist</h3>
          )}
        </div>
      </div>
      {active && (
        <div className="bulk-action">
          <div className="content">
            <span>Bulk Action:</span>
            <div className="group-action">
              <Button
                primary
                onClick={() => {
                  setActive(false);
                  setListCheckBox([]);
                }}
              >
                Done
              </Button>
              <Button destructive onClick={deleteBulkAction}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
