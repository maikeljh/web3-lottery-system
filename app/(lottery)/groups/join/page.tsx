"use client";

import { Button, Flex } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useState } from "react";
import L from "../../../../public/assets/L.png";
import Link from "next/link";

const Page = () => {
  return (
    <Flex
      bg={"white"}
      rounded={"xl"}
      padding={"2rem"}
      direction={"column"}
      align={"center"}
      gap={"2rem"}
      w={"50%"}
      shadow={"lg"}
      mx={"auto"}
    >
      <div className="w-1/2 mx-auto">
        <Image
          src={L}
          alt="Add thumbnail"
          className="w-[8rem] h-auto mx-auto"
        />
      </div>
      <h1 className="text-2xl font-bold">Joining Group</h1>
      <Flex direction={"row"} gap={"1rem"} align={"center"}>
        <h1 className="text-2xl font-bold">
          Select your role<span className="text-danger">*</span>
        </h1>
        <select className="p-2 border-2">
          <option>Role Name 1</option>
        </select>
      </Flex>
      <Link href={"/groups/1"} className="mx-auto">
        <Button
          width={"8rem"}
          fontSize={"small"}
          className="!bg-primary-1-400"
          color={"white"}
          mx={"auto"}
          fontWeight={"bold"}
          shadow={"lg"}
        >
          JOIN GROUP
        </Button>
      </Link>
    </Flex>
  );
};

export default Page;
