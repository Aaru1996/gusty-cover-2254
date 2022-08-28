import React, { useContext, useState } from "react";
import { MdExpandMore, MdOutlineFlashOn } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { IoMdArrowDropdown, IoIosSearch, IoMdSettings } from "react-icons/io";
import "./home.css";
import { Crm } from "../../Pages/CRM/Crm";
import { AuthContext } from "../../Context/AuthContext";
import TaskApp from "../Tasks/TaskApp";
export const Home = () => {
  const {
    state: { crm ,tasks},
    dispatch,
  } = useContext(AuthContext);
  console.log("crm", crm);
  return (
    <div className="home">
      <div className="middle-container-tab">
        <ul>
          <li className="active-tab tab-list">Tasks</li>
          <li className="tab-list">Projects</li>
          <li className="tab-list">Scrum</li>
          <li className="tab-list">Efficiency</li>
          <li
            className="tab-list"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <span>More</span>
            <MdExpandMore />
          </li>
        </ul>
      </div>
      <div className="progress-bar">
        <div className="new-task-search">
          <input type="text" placeholder="Filter and Search" />
          <IoIosSearch />
          <div></div>
        </div>
        <div className="new-task-icons">
          <div>
            <IoMdSettings />
          </div>
          <div>
            <MdOutlineFlashOn />
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>{crm && <Crm />}</div>
        <div style={{ marginTop: "50px" ,border:'1px solid red'}}>{tasks && <TaskApp />}</div>
      </div>
    </div>
  );
};
