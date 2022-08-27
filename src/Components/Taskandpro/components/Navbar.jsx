import {
  Avatar,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./navbar.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { IoNotificationsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { VscQuestion, VscEdit } from "react-icons/vsc";
import { RiChatVoiceLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";
function NavBar() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [menuCollapse, setMenuCollapse] = useState(false);
  useEffect(() => {
    let inter = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 2 * 1000);
    return () => {
      clearInterval(inter);
    };
  }, [time]);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div className="nav-container">
        <Flex
          position={"sticky"}
          top={"0px"}
          padding={"10px"}
          width="100%"
          gap={"5rem"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Flex title="Home" class="logo" alignItems="center" gap="5">
            <AiOutlineMenu
              onClick={menuIconClick}
              style={{ color: "#fff", fontSize: "1.3rem" }}
            />
            <span class="logo-text-container">
              <span class="logo-text">Bitrix</span>
              <span class="logo-color">24</span>
            </span>
          </Flex>
          <Flex alignItems={"center"} gap={"4%"} flex={2}>
            {" "}
            <VscEdit color="#535c69" fontSize={"1.5rem"} />
            <InputGroup>
              <Input
                placeholder="find people, documents, and more"
                borderRadius={"50px"}
                background={"#2E4064"}
                border={"0px"}
                color={"#FFFEFF"}
              />
              <InputRightElement children={<SearchIcon color={"#FFFEFF"} />} />
            </InputGroup>
            <Flex alignItems={"center"} className="time-box">
              {" "}
              <Text fontSize="4xl" color={"#FFFEFF"}>
                {time.slice(0, 6)}
              </Text>
              <Text fontSize="xl" color={"#FFFEFF"} marginTop="-6px">
                {time.slice(-2)}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} flex={2} justifyContent={"end"}>
            <Stack direction="row" alignItems={"center"}>
              <Avatar></Avatar>
              <Button
                rightIcon={<TriangleDownIcon fontSize={"12px"} />}
                color={"#FFFEFF"}
                borderRadius={"50px"}
                _hover={{ opacity: 0.8 }}
                variant="ghost"
              >
                Murali naayak
              </Button>
            </Stack>
            {/* <Spacer /> */}
            <Stack direction="row" spacing={4} alignItems={"center"}>
              <Button
                rightIcon={<TriangleDownIcon fontSize={"12px"} />}
                background={"#ECA41C"}
                color={"#FFFEFF"}
                borderRadius={"50px"}
                variant="solid"
                _hover={{ opacity: 0.8 }}
              >
                Upgrade
              </Button>
              <Button
                rightIcon={<TriangleDownIcon fontSize={"12px"} />}
                background={"#14BED5"}
                borderRadius={"50px"}
                color={"#FFFEFF"}
                variant="solid"
                _hover={{ opacity: 0.8 }}
              >
                Invite
              </Button>
            </Stack>
          </Flex>
          <div className="right-sidebar">
            <ul>
              {/* <p></p> */}
              <li>
                <VscQuestion />
              </li>
              <li>
                <IoNotificationsSharp />
              </li>
              <li>
                <RiChatVoiceLine />
              </li>
              <li>
                <AiOutlineSearch />
              </li>
              <li>
                <IoNotificationsSharp />
              </li>
            </ul>
          </div>
        </Flex>
        <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            {/* </SidebarHeader> */}
            <SidebarContent>
              <ui className="menu">
                <li className="active">
                  <p className="galiya"> Tasks and Projects</p>
                </li>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
                <li>Category</li>
              </ui>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </div>
    </>
  );
}

export default NavBar;
