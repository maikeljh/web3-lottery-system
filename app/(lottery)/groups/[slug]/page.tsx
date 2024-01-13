"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import L from "../../../../public/assets/L.png";
import Edit from "../../../../public/assets/edit.png";
import Link from "next/link";
import User from "../../../../public/assets/user.png";
import Search from "../../../../public/assets/search.png";
import Banner from "../../../../public/assets/banner.png";
import { useState } from "react";
import Card from "@/components/common/Card";
import { canisterId } from "@/config/declarations/dfx_generated";

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

  const data2 = [
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
    <Flex direction={"column"} gap={"1.5rem"}>
      <Flex
        bg={"white"}
        padding={"2rem"}
        gap={"2rem"}
        shadow={"xl"}
        rounded={"lg"}
        align={"center"}
      >
        <div>
          <Image src={L} alt="" className="w-[10rem]" />
        </div>
        <Flex direction={"column"} gap={"1rem"} align={"self-start"}>
          <h1 className="text-2xl font-bold">Group Name</h1>
          <p>1.2k members</p>
          <Button
            width={"8rem"}
            fontSize={"small"}
            className="!bg-primary-1-400"
            color={"white"}
            fontWeight={"bold"}
            shadow={"lg"}
          >
            INVITE MEMBER
          </Button>
        </Flex>
        <Spacer />
        <Link href={"/groups/1/manage"} className="mb-auto">
          <Image src={Edit} alt="" />
        </Link>
      </Flex>
      <Flex direction={"row"} gap={"1.5rem"} align={"flex-start"}>
        <Flex
          direction={"column"}
          bg={"white"}
          padding={"2rem"}
          shadow={"xl"}
          rounded={"lg"}
          gap={"1rem"}
          width={"30%"}
          height={"auto"}
        >
          <h1 className="text-2xl font-bold">Members (1.2k)</h1>
          <Flex direction={"column"}>
            {data &&
              data.map((user, index) => (
                <Flex py={"1rem"} gap={"1rem"} align={"center"} key={index}>
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
                </Flex>
              ))}
          </Flex>
          <Link href={"/groups/1/manage"} className="text-center font-semibold">
            See All Members
          </Link>
        </Flex>
        <Flex
          direction={"column"}
          width={"70%"}
          bg={"white"}
          padding={"2rem"}
          shadow={"xl"}
          rounded={"lg"}
        >
          <Flex direction={"column"} gap={"2rem"}>
            <Flex>
              <h1 className="text-3xl font-bold">Lotteries</h1>
              <Spacer />
              <Flex gap={"1rem"} align={"center"}>
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
                <Link href={`/lotteries/create?canisterId=${canisterId}`}>
                  <Button
                    width={"8rem"}
                    fontSize={"small"}
                    className="!bg-primary-1-400"
                    color={"white"}
                    fontWeight={"bold"}
                    shadow={"lg"}
                  >
                    + HOST LOTTERY
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <Flex direction={"row"} gap={"2rem"} wrap={"wrap"}>
              {data2 &&
                data2.map((lottery) => (
                  <>
                    <Link href={`/lotteries/1`} className="basis-[23%]">
                      <Card
                        image={`data:image/png;base64,${Buffer.from(
                          ""
                        ).toString("base64")}`}
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
      </Flex>
    </Flex>
  );
};

export default Page;
