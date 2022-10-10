import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useMenuState,
} from "@chakra-ui/react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({});
  const { state, dispatch } = useContext(AuthContext);

  const loginUser = async () => {
    try {
      await axios
        .post("https://bitrix-clone.herokuapp.com/auth/login", loginData)
        .then((data) => {
          // console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("name", data.data.user.name);
          localStorage.setItem("email", data.data.user.email);
          dispatch({ type: "loginSuccess", payload: data.data });
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  if (state.isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <HStack w="100%">
      <Box
        w="43%"
        h="100vh"
        bgColor="#53dffa"
        position="sticky"
        left="0"
        top="0"
        bottom="0"
        right="0"
      >
        <HStack mt="50px" justifyContent="space-evenly" alignItems="center">
          <Box>
            <Image src="https://www.bitrix24.net/bitrix/templates/new/images/bitrix24-logo-en.svg" />
          </Box>
          <Box color="white">
            <Link to="/">← Back to site</Link>
          </Box>
        </HStack>
        <Box color="white" textAlign="left" ml="12%" mt="33%">
          <Heading fontSize="38px" fontWeight="medium">
            Your company. <br /> United.
          </Heading>
          <Text fontSize="25px" mt="2%">
            Free. Unlimited. Online
          </Text>
        </Box>
        <Flex mt="22%" flexDirection="row-reverse" mr="12%">
          <Button border="1px solid white" p="4%" variant="ghost" color="white">
            English
          </Button>
        </Flex>
      </Box>
      <Box w="57%">
        <Heading mt="15%" ml="10%" fontWeight="normal" textAlign="left">
          Bitrix24 Login
        </Heading>
        <Box m="5% 10%" borderBottom="1px solid #e2e8f0"></Box>
        <Text
          textAlign="left"
          fontWeight="light"
          fontSize="20px"
          mt="5%"
          ml="10%"
        >
          Enter phone number or email
        </Text>
        <Box>
          <Input
            type="text"
            h="50px"
            border="2px solid grey"
            w="80%"
            name="email"
            onChange={(e) => handleOnChange(e)}
            placeholder="Enter email"
          />
        </Box>
        <Text
          textAlign="left"
          fontWeight="light"
          fontSize="20px"
          mt="1%"
          ml="10%"
        >
          Enter your password
        </Text>
        <Box>
          <Input
            placeholder="Enter your password"
            type="password"
            h="50px"
            border="2px solid grey"
            w="80%"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
        </Box>
        <Box>
          <Button
            color="white"
            bgColor="#53dffa"
            size="lg"
            mt="2%"
            onClick={() => loginUser()}
          >
            Login
          </Button>
        </Box>
        <Text mt="3%" fontWeight="light" fontSize="20px">
          or
        </Text>
        <Text mt="3%" fontWeight="light" fontSize="20px">
          Log in with
        </Text>
        <HStack justifyContent="space-evenly">
          <Box>
            <HStack gap="15px">
              <Box>
                <Image
                  w="40px"
                  h="40px"
                  src="https://seeklogo.com/images/F/facebook-icon-circle-logo-09F32F61FF-seeklogo.com.png"
                />
              </Box>
              <Box w="80px" h="40px" boxShadow="md" rounded="md">
                <Image
                  w="40px"
                  h="40px"
                  src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw"
                />
              </Box>
              <Box>
                <Image
                  w="40px"
                  h="40px"
                  src="https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png"
                />
              </Box>
              <Box>
                <Image
                  w="40px"
                  h="40px"
                  src="https://user-images.githubusercontent.com/38910103/39518756-879e401c-4e04-11e8-8aaf-3f7edc6e3726.png"
                />
              </Box>
              <Box>
                <Image
                  w="30px"
                  h="30px"
                  src="https://png.pngtree.com/png-clipart/20210627/original/pngtree-white-blue-simple-right-arrow-web-icon-png-image_6461448.jpg"
                />
              </Box>
            </HStack>

            <HStack alignItems="center" justifyContent="center" mt="5px">
              <Box>
                <Image
                  w="50px"
                  h="50px"
                  src="https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg"
                />
              </Box>
              <Box>
                <Image
                  w="50px"
                  h="50px"
                  src="data:image/png;base64,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"
                />
              </Box>
            </HStack>
          </Box>
          <Box>
            <Box>
              <Image
                w="90px"
                h="70px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJqCcSUTrE4-IGCdgVHdp98LXc5Wr-Z53z7Qh7CRQnzu6GjBjkp22P6et4CdCgcigPTE&usqp=CAU"
              />
            </Box>
            <Box>
              log in with QR <br /> code
            </Box>
          </Box>
        </HStack>

        <Box m="3% 10%" borderBottom="1px solid #e2e8f0"></Box>

        <Box mt="8%" fontWeight="light" fontSize="20px">
          <Button
            mr="20px"
            bgColor="#9dcf00"
            w="150px"
            h="50px"
            borderRadius="25px"
            color="white"
          >
            NEXT
          </Button>
          <span>FORGET PASSWORD?</span>
        </Box>

        <Text
          mt="100px"
          mb="20px"
          fontSize="17px"
          color="#0ebaba"
          textDecoration="underline"
        >
          Need help?
        </Text>
      </Box>
    </HStack>
  );
}
