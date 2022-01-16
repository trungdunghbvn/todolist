import React, { createContext, useReducer } from "react";

const initialState = {
  listTasks: [],
};

const TodoContext = createContext(initialState);
const { Provider } = TodoContext;

function reducer(state, action) {
  switch (action.type) {
    case "GET_TO_DO_LIST":
      const list = localStorage.getItem("_exercise_to_do_list");
      return {
        ...state,
        listTasks: list ? JSON.parse(list) : [],
      };

    case "ADD_TO_DO_LIST":
      const data = action.value;
      const listTasks = [...state.listTasks];
      listTasks.push(data);
      updateStorage(listTasks);
      return {
        ...state,
        listTasks: listTasks,
      };
    case "UPDATE_TASK":
      let task = action.task;
      let dataListTasks = [...state.listTasks];
      for (let i = 0; i < dataListTasks.length; i++) {
        if (dataListTasks[i].id === task.id) {
          dataListTasks.splice(i, 1);
          dataListTasks.splice(i, 0, task);
          break;
        }
      }
      updateStorage(dataListTasks);
      return {
        ...state,
        listTasks: dataListTasks,
      };

    case "DELETE_TO_DO_LIST":
      const id = action.id;
      const dataList = [...state.listTasks];
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === id) {
          dataList.splice(i, 1);
        }
      }
      updateStorage(dataList);
      return {
        ...state,
        listTasks: dataList,
      };

    case "BULK_DELETE_TO_DO_LIST":
      const arr = action.value;
      let dataListBulkAction = [...state.listTasks];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < dataListBulkAction.length; j++) {
          if (dataListBulkAction[j].id === arr[i]) {
            dataListBulkAction.splice(j, 1);
          }
        }
      }
      updateStorage(dataListBulkAction);
      return {
        ...state,
        listTasks: dataListBulkAction,
      };
    default:
      return state;
  }
}

const updateStorage = (list) => {
  if (list) {
    localStorage.setItem("_exercise_to_do_list", JSON.stringify(list));
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { TodoContext, TodoProvider };
