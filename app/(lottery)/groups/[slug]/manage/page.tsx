"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import User from "../../../../../public/assets/leader.png";

const Page = () => {
  const [data, setData] = useState([
    {
      username: "username",
      name: "Sebastian",
      point: 1124,
    },
    {
      username: "username",
      name: "Sebastian",
      point: 1024,
    },
    {
      username: "username",
      name: "Sebastian",
      point: 924,
    },
    {
      username: "username",
      name: "Sebastian",
      point: 824,
    },
    {
      username: "username",
      name: "Sebastian",
      point: 724,
    },
  ]);

  const loadMore = () => {
    setData(data.concat(data));
  };

  return (
    <>
      <Flex direction={"column"} gap={"1rem"}>
        <h1 className="text-3xl font-bold">Members (1.2k)</h1>
        <Flex direction={"column"} gap={"1rem"}>
          {data &&
            data.map((user, index) => (
              <>
                <Flex
                  bg="white"
                  padding={"1rem"}
                  className="shadow-lg"
                  gap={"1rem"}
                  align={"center"}
                >
                  <div className="relative">
                    <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                      <span className="transform -rotate-45 text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <Flex
                    align="center"
                    className="border-2 border-primary-2-400 rounded-full"
                  >
                    <Image src={User} alt="user" className="w-[2rem]" />
                  </Flex>
                  <Flex direction={"column"} fontWeight={"semibold"}>
                    <p>{user.name}</p>
                    <p>@{user.username}</p>
                  </Flex>
                  <Spacer />
                  <Flex gap={"1.5rem"}>
                    <select className="p-2 border-2">
                      <option>Role Name 1</option>
                    </select>
                    <Button
                      width={"6rem"}
                      fontSize={"small"}
                      className="!bg-danger"
                      color={"white"}
                      mx={"auto"}
                    >
                      REMOVE
                    </Button>
                  </Flex>
                </Flex>
              </>
            ))}
        </Flex>
        <Flex align={"center"} padding={"1rem"} width={"full"}>
          <Button
            width={"6rem"}
            fontSize={"small"}
            className="!bg-primary-1-400"
            color={"white"}
            mx={"auto"}
            onClick={() => loadMore()}
          >
            Load More
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
