"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Banner from "../../../public/assets/L.png";
import Card from "@/components/common/Card";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const data = [
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Group Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
  ];

  return (
    <>
      <Flex direction={"column"}>
        <Flex direction={"column"} gap={"2rem"}>
          <Flex>
            <h1 className="text-3xl font-bold">Joined Groups</h1>
            <Spacer />
            <Link href={"/groups/create"}>
              <Button
                width={"8rem"}
                fontSize={"small"}
                className="!bg-primary-1-400"
                color={"white"}
                mx={"auto"}
                fontWeight={"bold"}
                shadow={"lg"}
              >
                + NEW GROUP
              </Button>
            </Link>
          </Flex>
          <Flex direction={"row"} gap={"2rem"} wrap={"wrap"}>
            {data &&
              data.map((group) => (
                <>
                  <Link href="/groups/1" className="basis-[23%]">
                    <Flex
                      padding={"1rem"}
                      backgroundColor={"white"}
                      w={"full"}
                      align={"center"}
                      justifyContent={"center"}
                      textAlign={"center"}
                      rounded={"lg"}
                      flexBasis={"23%"}
                      flexGrow={1}
                      shadow={"xl"}
                      cursor={"pointer"}
                    >
                      <Flex
                        direction={"column"}
                        gap={"10px"}
                        w={"full"}
                        mb={"auto"}
                      >
                        <Flex align="center">
                          <Image
                            src={group.image}
                            alt="banner"
                            className="w-full h-auto"
                          />
                        </Flex>
                        <p className="font-bold text-lg">{group.title}</p>
                        {group.description}
                      </Flex>
                    </Flex>
                  </Link>
                </>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
