"use client";

import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import Notif from "../../public/assets/notif.png";
import User from "../../public/assets/user.png";
import Ok from "../../public/assets/ok.png";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        className="bg-primary-1-600"
        color="white"
        position="sticky"
        top={0}
        left={0}
        zIndex={99999}
      >
        <Flex align="center" ml={5} mr={40} padding="0.75rem">
          <Image src={Logo} alt="logo" className="w-[9rem]" />
        </Flex>
        <Flex align="center" fontWeight={"bold"}>
          <Link
            href="/"
            className={`px-8 h-full flex items-center ${
              pathname === "/" ? "text-primary-2-400 underline" : ""
            } hover:text-primary-2-400`}
          >
            Home
          </Link>
          <Link
            href="/lotteries"
            className={`px-8 relative group h-full flex items-center ${
              pathname.startsWith("/lotteries")
                ? "text-primary-2-400 underline"
                : ""
            } hover:text-primary-2-400`}
          >
            Lotteries
            <div className="hidden group-hover:block absolute top-[61px] bg-primary-1-500 left-0 rounded-b-lg rounded-tr-lg p-4 w-[14rem]">
              <Flex direction={"column"} gap={"5px"}>
                <Link
                  href="/lotteries"
                  className={`text-white hover:text-primary-2-400 ${
                    pathname === "/lotteries"
                      ? "!text-primary-2-400 underline"
                      : ""
                  }`}
                >
                  Public Lotteries
                </Link>
                <Link
                  href="/lotteries/hosted"
                  className={`text-white hover:text-primary-2-400 ${
                    pathname.startsWith("/lotteries/hosted")
                      ? "!text-primary-2-400 underline"
                      : ""
                  }`}
                >
                  Hosted Lotteries
                </Link>
                <Link
                  href="/lotteries/participated"
                  className={`text-white hover:text-primary-2-400 ${
                    pathname.startsWith("/lotteries/participated")
                      ? "!text-primary-2-400 underline"
                      : ""
                  }`}
                >
                  Participated Lotteries
                </Link>
              </Flex>
            </div>
          </Link>
          <Link
            href="/groups"
            className={`px-8 h-full flex items-center  ${
              pathname.startsWith("/groups")
                ? "text-primary-2-400 underline"
                : ""
            } hover:text-primary-2-400`}
          >
            Groups
          </Link>
          <Link
            href="/leaderboard"
            className={`px-8 h-full flex items-center ${
              pathname.startsWith("/leaderboard")
                ? "text-primary-2-400 underline"
                : ""
            } hover:text-primary-2-400`}
          >
            Leaderboard
          </Link>
        </Flex>
        <Spacer />
        <Flex mr={5} align="center" padding="0.75rem">
          <Link href="/lotteries/create" className="px-8">
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
          <div className="px-4 cursor-pointer relative">
            <Image
              src={Notif}
              alt="notification"
              onClick={() => setOpen(!open)}
            />
            {open ? (
              <div className="absolute bg-white top-[44px] right-0 text-black w-[36rem] z-[9999] shadow-xl rounded-b-lg">
                <Flex direction={"column"} className="w-full">
                  <Flex
                    direction={"row"}
                    padding={"1rem"}
                    className="border-b-[1px]"
                  >
                    <p className="font-semibold">Notifications</p>
                    <Spacer />
                    <p className="text-[#3E98EB]">Mark all as read</p>
                  </Flex>
                  <Flex
                    bg="white"
                    padding={"1rem"}
                    className="border-b-[1px]"
                    gap={"1rem"}
                    align={"center"}
                  >
                    <Flex
                      align="center"
                      className="border-2 border-primary-2-400 rounded-full"
                    >
                      <Image src={User} alt="user" className="w-[1.75rem]" />
                    </Flex>
                    <p className="font-semibold">
                      Lottery “Anjay” just ended. Check out the result!
                    </p>
                    <Spacer />
                    <Flex align="center">
                      <Image src={Ok} alt="ok" className="w-[1.75rem]" />
                    </Flex>
                  </Flex>
                  <Flex padding={"1rem"}>
                    <Link
                      className="mx-auto text-[#3E98EB]"
                      href="/notifications"
                      onClick={() => setOpen(false)}
                    >
                      View All
                    </Link>
                  </Flex>
                </Flex>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Link className="px-4 cursor-pointer" href={"/profile"}>
            <Image src={User} alt="user" className="w-[1.75rem]" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
