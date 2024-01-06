"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Leader from "../../../public/assets/leader.png";

const Page = () => {
  return (
    <>
      <Flex direction={"column"}>
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mx-auto w-1/3 bg-primary-1-500 h-3/5 mt-[6rem] p-4 rounded-tr-xl rounded-xl relative">
          <Flex direction={"column"} gap={"0.75rem"}>
            <Flex
              align="center"
              className="border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[37%]"
              direction={"column"}
            >
              <Image src={Leader} alt="leader" className="w-[7rem]" />
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="mt-12 text-lg font-semibold text-white">Name</p>
              <p className="bg-white p-2 rounded-lg">Jackson</p>
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Username</p>
              <p className="bg-white p-2 rounded-lg">@username</p>
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Points</p>
              <p className="bg-white p-2 rounded-lg">1847</p>
            </Flex>
            <Button mt={"1rem"}>Logout</Button>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default Page;
