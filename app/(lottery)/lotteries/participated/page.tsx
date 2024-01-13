"use client";

import { Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Card from "@/components/common/Card";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/use-auth-client";
import { makeAzleActor } from "../../../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { useSearchParams } from "next/navigation";

interface Lottery {
  id: Principal;
  title: string;
  participantsAmount: bigint;
  endedAt: bigint;
  lotteryBanner: Uint8Array | number[];
}

const Page = () => {
  const [listOfCompleted, setCompleted] = useState<Lottery[]>([]);
  const [listOfOngoing, setOngoing] = useState<Lottery[]>([]);
  const canisterId =
    useSearchParams().get("canisterId") || localStorage.getItem("canisterId");
  const { principal, isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const azle: AZLE = await makeAzleActor();
        const ongoing = await azle.participatedOngoingLotteries(principal);
        if ("Ok" in ongoing) {
          setOngoing(ongoing.Ok);
        }
        const completed = await azle.participatedCompletedLotteries(principal);
        if ("Ok" in completed) {
          setCompleted(completed.Ok);
        }
      } catch (error) {
        return;
      }
    };

    if (!isAuthenticated) {
      login();
      return;
    }

    fetchData();
  }, [isAuthenticated, login, principal]);

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
            {listOfOngoing &&
              listOfOngoing.slice(0, 3).map((lottery) => (
                <>
                  <Link
                    href={`/lotteries/${lottery.id.toString()}?canisterId=${canisterId}`}
                    className="basis-[23%]"
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
                    />
                  </Link>
                </>
              ))}
            {listOfOngoing.length === 0 ? (
              <h1 className="text-3xl mx-auto text-center mt-12 font-semibold">
                No lotteries available yet.
              </h1>
            ) : (
              <></>
            )}
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
            {listOfCompleted &&
              listOfCompleted.slice(0, 3).map((lottery) => (
                <>
                  <Link
                    href={`/lotteries/${lottery.id.toString()}?canisterId=${canisterId}`}
                    className="basis-[23%]"
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
                    />
                  </Link>
                </>
              ))}
            {listOfCompleted.length === 0 ? (
              <h1 className="text-3xl mx-auto text-center mt-12 font-semibold">
                No lotteries available yet.
              </h1>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
