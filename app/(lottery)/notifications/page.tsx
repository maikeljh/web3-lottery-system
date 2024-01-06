"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import User from "../../../public/assets/user.png";
import Ok from "../../../public/assets/ok.png";

const Page = () => {
  const [data, setData] = useState([
    {
      notification: "Lottery “Anjay” just ended. Check out the result!",
    },
    {
      notification: "Lottery “Anjay” just ended. Check out the result!",
    },
    {
      notification: "Lottery “Anjay” just ended. Check out the result!",
    },
    {
      notification: "Lottery “Anjay” just ended. Check out the result!",
    },
    {
      notification: "Lottery “Anjay” just ended. Check out the result!",
    },
  ]);

  const loadMore = () => {
    setData(data.concat(data));
  };

  return (
    <>
      <Flex direction={"column"} gap={"1rem"}>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Flex direction={"column"} gap={"1rem"}>
          {data &&
            data.map((notif, index) => (
              <>
                <Flex
                  bg="white"
                  padding={"1rem"}
                  className="shadow-lg"
                  gap={"1rem"}
                  align={"center"}
                >
                  <Flex
                    align="center"
                    className="border-2 border-primary-2-400 rounded-full"
                  >
                    <Image src={User} alt="user" className="w-[1.75rem]" />
                  </Flex>
                  <p>{notif.notification}</p>
                  <Spacer />
                  <Flex align="center">
                    <Image src={Ok} alt="ok" className="w-[1.75rem]" />
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
