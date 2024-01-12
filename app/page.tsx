"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Flex } from "@chakra-ui/react";
import Logo from "../public/assets/biglogo.png";
import Giveaway from "../public/assets/giveaway.png";
import Prize from "../public/assets/prize.png";
import Community from "../public/assets/community.png";
import Rocket from "../public/assets/rocket.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const canisterId = useSearchParams().get("canisterId");

  useEffect(() => {
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!localStorage.getItem("profile")) {
      router.push(`/profile?canisterId=${canisterId}`);
    }
  }, [isAuthenticated, login, router, canisterId]);

  return (
    <>
      <Flex direction={"column"} gap={"2rem"} px={"1rem"}>
        <Flex className="w-1/2 mx-auto">
          <Image src={Logo} alt="logo" className="mx-auto w-2/3" />
        </Flex>
        <Flex gap={"2rem"} align={"center"}>
          <Flex className="w-1/3">
            <Image src={Giveaway} alt="logo" className="mx-auto w-1/2" />
          </Flex>
          <h1 className="w-2/3 text-xl font-semibold mx-auto pr-[2rem] text-justify">
            {`At Lottereum, we're dedicated to bringing joy and
              excitement to our community through thrilling giveaways. Whether
              you're a seasoned participant or new to the world of giveaways,
              you're in for a treat!`}
          </h1>
        </Flex>
        <Flex direction={"column"} gap={"2rem"} justifyContent={"center"}>
          <h1 className="text-3xl font-bold text-center text-primary-2-400">
            Why Choose Us?
          </h1>
          <Flex gap={"2rem"} align={"center"}>
            <Flex className="w-1/3">
              <Image src={Prize} alt="logo" className="mx-auto w-1/2" />
            </Flex>
            <h1 className="w-2/3 text-xl font-semibold mx-auto pr-[2rem] text-justify">
              {`Giveaways Galore: Discover a world of giveaways and contests.
              From tech gadgets to exclusive experiences, there's always
              something new to win.`}
            </h1>
          </Flex>
          <Flex gap={"2rem"} align={"center"}>
            <Flex className="w-1/3">
              <Image src={Community} alt="logo" className="mx-auto w-1/2" />
            </Flex>
            <h1 className="w-2/3 text-xl font-semibold mx-auto pr-[2rem] text-justify">
              {`Connect with Community: Join a community of like-minded
              individuals. Share your passion, learn from others, and be a part
              of something extraordinary.`}
            </h1>
          </Flex>
          <Flex gap={"2rem"} align={"center"}>
            <Flex className="w-1/3">
              <Image src={Rocket} alt="logo" className="mx-auto w-1/2" />
            </Flex>
            <h1 className="w-2/3 text-xl font-semibold mx-auto pr-[2rem] text-justify">
              {`Stay Informed: Stay up-to-date with the latest trends, news, and
              insights. Our curated content keeps you informed and entertained.`}
            </h1>
          </Flex>
        </Flex>
        <Flex justify={"center"}>
          <Link href={`/lotteries?canisterId=${canisterId}`}>
            <Button
              width={"8rem"}
              fontSize={"small"}
              className="!bg-primary-1-400"
              color={"white"}
              mx={"auto"}
              fontWeight={"bold"}
              shadow={"lg"}
            >
              Start Exploring!
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
