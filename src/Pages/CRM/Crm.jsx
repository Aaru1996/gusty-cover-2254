import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Taskform } from "../../Components/TaskForm/Taskform";
import crm from "../CRM/Crm.module.css";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../../Context/TaskContext";
import axios from "axios";

export const Crm = () => {
  const { obj, index } = useContext(TaskContext);
  const [openform, setOpenform] = useState(false);
  const [tasks, setTasks] = useState([]);
  const handleOnClick = (el, i) => {
    setOpenform(!openform);
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === el.name) {
        tasks[i].form = <Taskform idx={tasks[i].id} />;
      } else {
        tasks[i].form = null;
      }
    }
  };
  useEffect(() => {
    axios.get("https://blooming-badlands-21297.herokuapp.com/tasks").then((r) => {
      setTasks(r.data);
    });
  }, [tasks.task]);

  useEffect(() => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i]._id === index) {
        // console.log('manish',tasks[i])
        axios
          .put(
            `https://blooming-badlands-21297.herokuapp.com/tasks/${tasks[i]._id}/edit`,
            obj
          )
          .then((res) => {
            axios
              .get(
                `https://blooming-badlands-21297.herokuapp.com/tasks`
              )
              .then((res) => {
                // console.log(res.data)
                setOpenform(!openform);
              });
          });
        console.log("obj", obj);
      }
    }
  }, [index, obj, tasks]);
  return (
    <div className={crm.main}>
      <div className={crm.topnav}>
        <div className={crm.topnav1}>
          <p>Kanban</p>
          <p>List</p>
          <p>Calender</p>
        </div>
        <div className={crm.topnav2}>
          <div>
            <p>With activities</p>
          </div>
          <div>
            <p>For today</p>
          </div>
          <div>
            <p>Overdue</p>
          </div>
        </div>
        <div className={crm.topnav3}>
          <div className={crm.extensions}>
            <div>
              <p>Extensions</p>
            </div>
            <div>
              <select name="" id=""></select>
            </div>
          </div>
          <div className={crm.auto}>
            <div>
              <p>Automation rules</p>
            </div>
          </div>
        </div>
      </div>
      <div className={crm.body}>
        {tasks.map((el, i) => (
          <div key={el.id} className={crm.task}>
            <div className={crm.taskheader}>
              <h3>{el.name}</h3>
            </div>
            <div className={crm.ruppee}>
              <h1>Rs. 0</h1>
            </div>
            <div className={crm.addbutton}>
              <button className={crm.add} onClick={() => handleOnClick(el, i)}>
                +
              </button>
            </div>
            <div>{openform && el.form}</div>
            <div>
              {el.task.map((t) => (
                <div className={crm.eachtask}>
                  <p className={crm.deal}>Deal: {t.deal}</p>
                  <p className={crm.amount}>Rs: {t.amount}</p>
                  <p className={crm.contact}>{t.contact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* {openform && <Taskform />} */}
      </div>
    </div>
  );
};
