import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { setToast, Toast } from "../../utils/Toast";
import { useEffect } from "react";

// https://bitrix-clone.herokuapp.com
// https://bitrix-clone.herokuapp.com

const successToast = (toast, message) => {
  setToast({
    toast,
    title: "Success",
    status: "success",
    description: message,
  });
};

const errorToast = (toast, message) => {
  setToast({
    toast,
    title: "Error",
    status: "warning",
    description: message,
  });
};

const SignupPage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { signupLoading, isSignedUp } = state;
  const navigate = useNavigate();
  // console.log(signupLoading, isSignedUp);
  const toast = useToast();
  const [tasks, setTasks] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks({ ...tasks, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    dispatch({ type: "signupRequest" });
    try {
      await axios
        .post("https://bitrix-clone.herokuapp.com/auth/register", tasks)
        .then((data) => {
          dispatch({ type: "signupSuccess", payload: data.data });
          successToast(toast);
        });
    } catch (err) {
      dispatch({ type: "signupFail" });
      errorToast(toast, err.response.data.msg);
    }
  };

  useEffect(() => {
    console.log("isSignedUp", isSignedUp);
    if (isSignedUp) {
      navigate("/login");
    }
  }, [isSignedUp, navigate]);

  return (
    <>
      {signupLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Box boxShadow="lg" w="30%" p="2%" m="auto" rounded="md">
          <Box>
            <form action="" onSubmit={handleClick}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  w="100%"
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleChange}
                  required
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  w="100%"
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <FormLabel>Password</FormLabel>
                <Input
                  w="100%"
                  type="text"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
                <Input
                  size="lg"
                  bgColor="blue"
                  mt="20px"
                  color="white"
                  type="submit"
                />
              </FormControl>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignupPage;
