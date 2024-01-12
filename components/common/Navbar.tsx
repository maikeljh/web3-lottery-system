"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../../public/assets/logo.png";
import L from "../../public/assets/L.png";
import Image from "next/image";
import Notif from "../../public/assets/notif.png";
import User from "../../public/assets/user.png";
import Ok from "../../public/assets/ok.png";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/use-auth-client";
import { makeAzleActor } from "../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { Principal } from "@dfinity/principal";

interface Notification {
  id: Principal;
  description: string;
  isRead: boolean;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [listOfNotifications, setNotifications] = useState<Notification[]>([]);
  const pathname = usePathname();
  const canisterId = useSearchParams().get("canisterId");

  const { principal, isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const azle: AZLE = await makeAzleActor();
        const notifications = await azle.getNotificationListByUser(principal);
        if ("Ok" in notifications) {
          setNotifications(notifications.Ok);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated, login, principal]);

  const readNotification = async (id: Principal) => {
    try {
      const azle: AZLE = await makeAzleActor();
      await azle.readNotification(principal);

      const fetchData = async () => {
        try {
          const azle: AZLE = await makeAzleActor();
          const notifications = await azle.getNotificationListByUser(principal);
          if ("Ok" in notifications) {
            setNotifications(notifications.Ok);
          }
        } catch (error) {
          console.log(error);
          return;
        }
      };

      if (isAuthenticated) fetchData();
    } catch (error) {
      console.log(error);
      return;
    }
  };

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
            href={`/?canisterId=${canisterId}`}
            className={`px-8 h-full flex items-center ${
              pathname === "/" ? "text-primary-2-400 underline" : ""
            } hover:text-primary-2-400`}
          >
            Home
          </Link>
          <div
            className={`relative group h-full flex items-center ${
              pathname.startsWith("/lotteries")
                ? "text-primary-2-400 underline"
                : ""
            } hover:text-primary-2-400`}
          >
            <Link
              href={`/lotteries?canisterId=${canisterId}`}
              className="px-8 h-full flex justify-center items-center"
            >
              Lotteries
            </Link>
            <div className="hidden group-hover:block absolute top-[61px] bg-primary-1-500 left-0 rounded-b-lg rounded-tr-lg p-4 w-[14rem]">
              <Flex direction={"column"} gap={"5px"}>
                <Link
                  href={`/lotteries?canisterId=${canisterId}`}
                  className={`text-white hover:text-primary-2-400 ${
                    pathname === "/lotteries"
                      ? "!text-primary-2-400 underline"
                      : ""
                  }`}
                >
                  Public Lotteries
                </Link>
                <Link
                  href={`/lotteries/hosted?canisterId=${canisterId}`}
                  className={`text-white hover:text-primary-2-400 ${
                    pathname.startsWith("/lotteries/hosted")
                      ? "!text-primary-2-400 underline"
                      : ""
                  }`}
                >
                  Hosted Lotteries
                </Link>
                <Link
                  href={`/lotteries/participated?canisterId=${canisterId}`}
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
          </div>
          <Link
            href={`/groups?canisterId=${canisterId}`}
            className={`px-8 h-full flex items-center  ${
              pathname.startsWith("/groups")
                ? "text-primary-2-400 underline"
                : ""
            } hover:text-primary-2-400`}
          >
            Groups
          </Link>
          <Link
            href={`/leaderboard?canisterId=${canisterId}`}
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
          <Link
            href={`/lotteries/create?canisterId=${canisterId}`}
            className="px-8"
          >
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
                  </Flex>
                  {listOfNotifications &&
                    listOfNotifications.slice(0, 3).map((item, idx) => (
                      <Flex
                        key={idx}
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
                          <Image src={L} alt="logo" className="w-[1.75rem]" />
                        </Flex>
                        <p className="font-semibold">{item.description}</p>
                        <Spacer />
                        <Flex align="center">
                          <Image
                            src={Ok}
                            alt="ok"
                            className="w-[1.75rem]"
                            onClick={() => readNotification(item.id)}
                          />
                        </Flex>
                      </Flex>
                    ))}
                  <Flex padding={"1rem"}>
                    <Link
                      className="mx-auto text-[#3E98EB]"
                      href={`/notifications?canisterId=${canisterId}`}
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
          <Link
            className="px-4 cursor-pointer"
            href={`/profile?canisterId=${canisterId}`}
          >
            <Image src={User} alt="user" className="w-[1.75rem]" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
