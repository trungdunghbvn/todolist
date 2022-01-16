import React from "react";
import NewTasks from "./new-tasks";
import ListTasks from "./list-tasks";

import "../assets/styles/main.scss";

export default function Main() {
  return (
    <div className="container">
      <div className="container__tasks">
        <NewTasks />
      </div>
      <div className="container__tasks container__tasks--list">
        <ListTasks />
      </div>
    </div>
  );
}
