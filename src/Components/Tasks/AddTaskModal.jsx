import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { getUserData } from "./Actions";
import styled from "styled-components";

const LoginForm = ({ onSubmit, setShow }) => {
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
    console.log(taskData);
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
    setShow(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Add Task</Form.Label>
        <input
          style={{
            width: "100%",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
          }}
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleAddTask}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Add Dealine</Form.Label>
        <input
          style={{
            width: "100%",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
          }}
          type="date"
          onChange={handleAddTask}
        />
      </Form.Group>
      <Button variant="primary" onClick={() => handleSubmitTask()}>
        Save
      </Button>
    </Form>
  );
};

export default function AddTaskModal() {
  const {
    state: { pageLimit, currentPage },
    dispatch,
  } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData(dispatch, token);
  }, []);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <Wrapper>
      <div className="header-addtask">
        <h1>My Tasks</h1>
        <Button variant="primary" onClick={handleShow}>
          Add Task
        </Button>
        <input type="text" placeholder="Filter and Search" />
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} setShow={setShow} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;

  .header-addtask {
    display: flex;
    border: 1px solid black;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    gap: 20px;

    input {
      width: 50%;
      border: 1px solid black;
      padding-left: 20px;
    }
  }
`;
