"use client";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import User from "../../../../../public/assets/user.png";
import { useState } from "react";

const Page = () => {
  const [data, setData] = useState([
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
  ]);

  const loadMore = () => {
    setData(data.concat(data));
  };

  return (
    <>
      <Flex direction={"column"} bg={"white"} padding={"2rem"}>
        <h1 className="text-3xl font-bold border-b-2 border-black pb-6">
          Participants
        </h1>
        <Flex direction={"column"}>
          {data &&
            data.map((user, index) => (
              <>
                <Flex
                  padding={"1rem"}
                  gap={"1rem"}
                  align={"center"}
                  className="border-b-2 border-black"
                >
                  <Flex
                    align="center"
                    className="border-2 border-primary-2-400 rounded-full"
                  >
                    <Image src={User} alt="user" className="w-[1.75rem]" />
                  </Flex>
                  <Flex direction={"column"} fontWeight={"semibold"}>
                    <p>{user.name}</p>
                    <p>@{user.username}</p>
                  </Flex>
                  <Spacer />
                  <p className="font-semibold">{user.joined}</p>
                </Flex>
              </>
            ))}
        </Flex>
        <Flex align={"center"} padding={"1rem"} width={"full"} mt={"1rem"}>
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
