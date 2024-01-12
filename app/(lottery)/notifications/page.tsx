"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import L from "../../../public/assets/L.png";
import Ok from "../../../public/assets/ok.png";
import { useAuth } from "@/app/use-auth-client";
import { Principal } from "@dfinity/principal";
import { makeAzleActor } from "../../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";

interface Notification {
  id: Principal;
  description: string;
  isRead: boolean;
}

const Page = () => {
  const [listOfNotifications, setNotifications] = useState<Notification[]>([]);
  const [maxNotif, setMaxNotif] = useState(10);

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

  const loadMore = () => {
    setMaxNotif(maxNotif + 5);
  };

  return (
    <>
      <Flex direction={"column"} gap={"1rem"}>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Flex direction={"column"} gap={"1rem"}>
          {listOfNotifications &&
            listOfNotifications.slice(0, maxNotif).map((notif) => (
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
                    <Image src={L} alt="user" className="w-[1.75rem]" />
                  </Flex>
                  <p>{notif.description}</p>
                  <Spacer />
                  <Flex align="center">
                    <Image
                      src={Ok}
                      alt="ok"
                      className="w-[1.75rem]"
                      onClick={() => readNotification(notif.id)}
                    />
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
