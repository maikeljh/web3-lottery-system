"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Banner from "../../../../../public/assets/banner.png";
import Search from "../../../../../public/assets/search.png";
import Card from "@/components/common/Card";
import Image from "next/image";
import Link from "next/link";
import { makeAzleActor } from "@/service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/use-auth-client";
import { useSearchParams } from "next/navigation";

interface Lottery {
  id: Principal;
  title: string;
  participantsAmount: bigint;
  endedAt: bigint;
  lotteryBanner: Uint8Array | number[];
}

const Page = () => {
  const [listOfLotteries, setLotteries] = useState<Lottery[]>([]);
  const [maxLottery, setMaxLottery] = useState(10);
  const canisterId =
    useSearchParams().get("canisterId") || localStorage.getItem("canisterId");
  const { principal, isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const azle: AZLE = await makeAzleActor();
        const lotteries = await azle.hostedOngoingLotteries(principal);
        if ("Ok" in lotteries) {
          setLotteries(lotteries.Ok);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    if (!isAuthenticated) {
      login();
      return;
    }

    fetchData();
  }, [isAuthenticated, login, principal]);

  const loadMore = () => {
    setMaxLottery(maxLottery + 5);
  };

  return (
    <>
      <Flex direction={"column"}>
        <Flex direction={"column"} gap={"2rem"}>
          <Flex>
            <h1 className="text-3xl font-bold">Ongoing Hosted Lotteries</h1>
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
            {listOfLotteries &&
              listOfLotteries.map((lottery) => (
                <>
                  <Link
                    href={`/lotteries/${lottery.id.toString()}?canisterId=${canisterId}`}
                    className="grow basis-[23%]"
                  >
                    <Card
                      image={`data:image/png;base64,${Buffer.from(
                        lottery.lotteryBanner
                      ).toString("base64")}`}
                      title={lottery.title}
                      description={
                        <>
                          <p className="text-primary-3-600">
                            {Number(lottery.participantsAmount)} participants
                          </p>
                          <p className="text-primary-3-600">
                            Ends at{" "}
                            {new Date(Number(lottery.endedAt)).toString()}
                          </p>
                        </>
                      }
                      basis={"23%"}
                    />
                  </Link>
                </>
              ))}
          </Flex>
          {maxLottery < listOfLotteries.length ? (
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
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
