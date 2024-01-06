"use client";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import User from "../../../public/assets/user.png";
import { useState } from "react";
import Leader from "../../../public/assets/leader.png";

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
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Flex direction={"row"} className="w-full mt-24">
          <Flex className="w-1/2 mx-auto text-white" direction={"row"}>
            <div className="w-full text-center bg-primary-1-600 h-3/5 mt-auto p-4 rounded-tl-xl rounded-bl-xl relative pb-[9rem]">
              <Flex
                align="center"
                className="border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                direction={"column"}
              >
                <Image src={Leader} alt="leader" className="w-[7rem]" />
                <div className="absolute bottom-[-8px]">
                  <div className="relative">
                    <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                      <span className="transform -rotate-45 text-white text-xs font-bold">
                        2
                      </span>
                    </div>
                  </div>
                </div>
              </Flex>
              <p className="mt-12">Jackson</p>
              <p>1847</p>
              <p>@username</p>
            </div>
            <div className="w-full text-center bg-primary-1-500 p-4 rounded-tl-xl rounded-tr-xl relative">
              <Flex
                align="center"
                className="border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                direction={"column"}
              >
                <Image src={Leader} alt="leader" className="w-[7rem]" />
                <div className="absolute bottom-[-8px]">
                  <div className="relative">
                    <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                      <span className="transform -rotate-45 text-white text-xs font-bold">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </Flex>
              <p className="mt-12">Jackson</p>
              <p>1847</p>
              <p>@username</p>
              <div className="h-[6rem]"></div>
            </div>
            <div className="w-full text-center bg-primary-1-600 h-3/5 mt-auto p-4 rounded-tr-xl rounded-br-xl relative pb-[9rem]">
              <Flex
                align="center"
                className="border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                direction={"column"}
              >
                <Image src={Leader} alt="leader" className="w-[7rem]" />
                <div className="absolute bottom-[-8px]">
                  <div className="relative">
                    <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                      <span className="transform -rotate-45 text-white text-xs font-bold">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </Flex>
              <p className="mt-12">Jackson</p>
              <p>1847</p>
              <p>@username</p>
            </div>
          </Flex>
        </Flex>
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
                        {index + 4}
                      </span>
                    </div>
                  </div>
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
                  <p className="font-semibold">{user.point}</p>
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
