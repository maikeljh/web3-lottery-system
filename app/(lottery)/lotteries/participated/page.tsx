"use client";

import { Flex, Spacer } from "@chakra-ui/react";
import Banner from "../../../../public/assets/banner.png";
import Link from "next/link";
import Card from "@/components/common/Card";

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
  ];

  return (
    <>
      <Flex direction={"column"} gap={"2rem"}>
        <Flex direction={"column"} gap={"1rem"}>
          <Flex>
            <h1 className="text-3xl font-bold">
              Ongoing Participated Lotteries
            </h1>
            <Spacer />
            <Link
              href="/lotteries/participated/ongoing"
              className="underline font-semibold"
            >
              See all
            </Link>
          </Flex>
          <Flex direction={"row"} gap={"2rem"}>
            {data &&
              data.map((lottery) => (
                <>
                  <Link href="/lotteries/1" className="grow basis-[23%]">
                    <Card
                      image={lottery.image}
                      title={lottery.title}
                      description={lottery.description}
                    />
                  </Link>
                </>
              ))}
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"1rem"}>
          <Flex>
            <h1 className="text-3xl font-bold">
              Completed Participated Lotteries
            </h1>
            <Spacer />
            <Link
              href="/lotteries/participated/completed"
              className="underline font-semibold"
            >
              See all
            </Link>
          </Flex>
          <Flex direction={"row"} gap={"2rem"}>
            {data &&
              data.map((lottery) => (
                <>
                  <Link href="/lotteries/1" className="grow basis-[23%]">
                    <Card
                      image={lottery.image}
                      title={lottery.title}
                      description={lottery.description}
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
