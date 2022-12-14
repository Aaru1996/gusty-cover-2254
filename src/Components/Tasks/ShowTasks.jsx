import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { deleteTask, getUserData, updateTask } from "./Actions";
import EditTask from "./EditTask";
import Pagination from "./Pagination";
import { ShowTime } from "./Static/DateConverter";
import TableHeader from "./Static/TableHeader";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";

const ShowTasks = () => {
  const {
    state,
    state: { data, pageLimit, currentPage },
    dispatch,
  } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [updatedDate, setUpdatedDate] = useState();
  const token = localStorage.getItem("token");
  const handleUpdateTask = (el) => {
    let change = { status: !el.status };
    updateTask(el._id, change, dispatch, token, currentPage, pageLimit);
  };

  const handleDeleteTask = (el) => {
    deleteTask(el, dispatch, token);
    getUserData(dispatch, token, currentPage, pageLimit);
  };

  useEffect(() => {
    getUserData(dispatch, token, currentPage, pageLimit);
  }, [currentPage, pageLimit]);

  const handleEditTask = (el) => {
    let change = { name: updatedText, deadline: updatedDate };
    updateTask(el._id, change, dispatch, token, currentPage, pageLimit);
    setShowEdit("");
  };

  const border = {
    border: "1px solid black",
  };
  return (
    <Wrapper>
      <div className="main-div">
        <table
          style={{ margin: "auto", marginBottom: "0.5rem", width: "100%" }}
        >
          <TableHeader />
          <tbody>
            {data.map((el, index) => {
              return (
                <tr key={index} style={border}>
                  <td>{index + 1}</td>
                  {showEdit == el._id ? (
                    <td style={border}>
                      <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        style={border}
                      />
                    </td>
                  ) : (
                    <td style={border}>{el.name}</td>
                  )}
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px 0px",
                    }}
                  >
                    <Button
                      className="m-1 mt-1"
                      onClick={() => handleUpdateTask(el)}
                    >
                      Change Status
                    </Button>
                  </td>
                  {el.status ? (
                    <td style={border}>Completed</td>
                  ) : (
                    <td style={border}>Not-Completed</td>
                  )}

                  {showEdit == el._id ? (
                    <td>
                      <input
                        type="date"
                        onChange={(e) => setUpdatedDate(e.target.valueAsNumber)}
                        style={border}
                      />
                    </td>
                  ) : (
                    <td>
                      <ShowTime deadline={el.deadline} />
                    </td>
                  )}
                  <td style={border}>
                    {showEdit == el._id ? (
                      <div>
                        <button onClick={() => handleEditTask(el)}>Save</button>
                      </div>
                    ) : (
                      <ActionsDiv>
                        <button onClick={() => handleDeleteTask(el)}>
                          <AiOutlineDelete />
                        </button>
                        <button
                          onClick={() => {
                            setShowEdit(el._id);
                            setUpdatedText(el.name);
                          }}
                        >
                          <AiOutlineEdit />
                        </button>
                      </ActionsDiv>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationDiv>
          <Pagination data={data} />
        </PaginationDiv>
      </div>
    </Wrapper>
  );
};

export default ShowTasks;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  .main-div {
    /* border: 1px solid blue; */
    margin-top: 5px;
  }
`;

const PaginationDiv = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
`;

const ActionsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;
