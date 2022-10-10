import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";

// https://bitrix-clone.herokuapp.com
// https://bitrix-clone.herokuapp.com

const SignupPage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { signupLoading } = state;
  console.log(signupLoading);
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
        });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: "signupFail" });
      alert(err.response.data.msg);
    }
  };

  if (state.isSignedUp) {
    return <Navigate to="/login" />;
  }
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
                onClick={handleClick}
              />
            </FormControl>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignupPage;
