"use client";

import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import Notif from "../../public/assets/notif.png";
import User from "../../public/assets/user.png";

const Navbar = () => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="0.75rem"
        className="bg-primary-1-600"
        color="white"
      >
        <Flex align="center" ml={5} mr={40}>
          <Image src={Logo} alt="logo" className="w-[9rem]" />
        </Flex>
        <Flex align="center">
          <Link href="/" className="px-8">
            Home
          </Link>
          <Link href="/lotteries" className="px-8">
            Lotteries
          </Link>
          <Link href="/groups" className="px-8">
            Groups
          </Link>
          <Link href="/leaderboard" className="px-8">
            Leaderboard
          </Link>
        </Flex>
        <Spacer />
        <Flex mr={5} align="center">
          <Link href="#" className="px-8">
            <Button
              className="bg-primary-2-400"
              textColor={"black"}
              fontWeight={"bold"}
              px={"0.5rem"}
              py={"0.25rem"}
              borderRadius={"20px"}
            >
              + Host Lottery
            </Button>
          </Link>
          <Link href="#" className="px-4">
            <Image src={Notif} alt="notification" />
          </Link>
          <Link href="#" className="px-4">
            <Image src={User} alt="user" className="w-[1.75rem]" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
