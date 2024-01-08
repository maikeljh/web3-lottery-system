"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Banner from "../../../public/assets/L.png";
import Card from "@/components/common/Card";
import Link from "next/link";

const Page = () => {
  const data = [
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k members</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
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
              data.map((lottery) => (
                <>
                  <Link href="/groups/1" className="grow basis-[23%]">
                    <Card
                      image={lottery.image}
                      title={lottery.title}
                      description={lottery.description}
                      basis={"23%"}
                    />
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
