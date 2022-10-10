import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getUserData } from "./Actions";

const AddTask = () => {
  const {
    state: { pageLimit, currentPage },
    dispatch,
  } = useContext(AuthContext);
  const [taskData, setTaskData] = useState({
    name: "",
    deadline: "",
  });
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleAddTask = (e) => {
    const { name, value, valueAsNumber } = e.target;
    if (valueAsNumber) {
      setTaskData({ ...taskData, deadline: valueAsNumber });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleSubmitTask = async () => {
    setTaskData({ ...taskData, name: "" });
    try {
      await axios
        .post("https://bitrix-clone.herokuapp.com/usertasks", taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getUserData(dispatch, token, currentPage, pageLimit);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData(dispatch, token);
  }, []);

  return (
    <div>
      <div>
        <h2>Name: {name}</h2>
      </div>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleAddTask}
        />
        <input type="date" onChange={handleAddTask} />
        <button onClick={() => handleSubmitTask()}>Add Task</button>
      </form>
      <div></div>
    </div>
  );
};

export default AddTask;
