"use client";

import { Flex, Spacer } from "@chakra-ui/react";
import Banner from "../../../../../public/assets/banner.png";
import Search from "../../../../../public/assets/search.png";
import Card from "@/components/common/Card";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const data = [
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
    {
      image: Banner,
      title: "Lottery Title",
      description: (
        <>
          <p className="text-primary-3-600">1.2k participants</p>
          <p className="text-primary-3-600">Ends at 10/12/23</p>
        </>
      ),
    },
  ];

  return (
    <>
      <Flex direction={"column"}>
        <Flex direction={"column"} gap={"2rem"}>
          <Flex>
            <h1 className="text-3xl font-bold">
              Ongoing Participated Lotteries
            </h1>
            <Spacer />
            <div className="relative">
              <input
                type="text"
                placeholder="Search lotteries..."
                className="p-2 pl-12 rounded-lg shadow-xl w-[20rem]"
              />
              <Image
                src={Search}
                alt=""
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </Flex>
          <Flex direction={"row"} gap={"2rem"} wrap={"wrap"}>
            {data &&
              data.map((lottery) => (
                <>
                  <Link href="/lotteries/1" className="grow basis-[23%]">
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
