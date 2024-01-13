/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "../../../../public/assets/calendar.png";
import Users from "../../../../public/assets/users.png";
import Link from "next/link";
import { makeAzleActor } from "@/service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { Principal } from "@dfinity/principal";
import { useAuth } from "@/app/use-auth-client";
import { useParams, useSearchParams } from "next/navigation";

interface CompletedLottery {
  id: Principal;
  title: string;
  participants: Array<{
    id: Principal;
    hostedLotteries: Array<Principal>;
    name: string;
    participatedLotteries: Array<Principal>;
    points: bigint;
    avatar: Uint8Array | number[];
  }>;
  types: string;
  participantsAmount: bigint;
  isCompleted: boolean;
  endedAt: bigint;
  createdAt: bigint;
  lotteryBanner: Uint8Array | number[];
  description: string;
  prizes: Array<{ id: Principal; name: string; quantity: bigint }>;
  hostId: Principal;
  winners: Array<{
    id: Principal;
    hostedLotteries: Array<Principal>;
    name: string;
    participatedLotteries: Array<Principal>;
    points: bigint;
    avatar: Uint8Array | number[];
  }>;
}

interface OngoingLottery {
  id: Principal;
  title: string;
  participants: Array<{
    id: Principal;
    hostedLotteries: Array<Principal>;
    name: string;
    participatedLotteries: Array<Principal>;
    points: bigint;
    avatar: Uint8Array | number[];
  }>;
  types: string;
  participantsAmount: bigint;
  isCompleted: boolean;
  endedAt: bigint;
  createdAt: bigint;
  lotteryBanner: Uint8Array | number[];
  description: string;
  groupId: [] | [Principal];
  prizes: Array<{ id: Principal; name: string; quantity: bigint }>;
  hostId: Principal;
}

enum LotteryType {
  Private = "PRIVATE",
  Public = "PUBLIC",
  Group = "GROUP",
  Completed = "COMPLETED",
  Joined = "JOINED",
}

const Page = () => {
  const [condition, setCondition] = useState(LotteryType["Public"]);
  const defaultGroupId: [] = [];
  const canisterId =
    useSearchParams().get("canisterId") || localStorage.getItem("canisterId");
  const { slug } = useParams();
  const { principal, isAuthenticated, login } = useAuth();
  const [detailLottery, setLottery] = useState<OngoingLottery>({
    id: principal,
    title: "",
    participants: [],
    types: "",
    participantsAmount: BigInt(0),
    isCompleted: false,
    endedAt: BigInt(0),
    createdAt: BigInt(0),
    lotteryBanner: new Uint8Array(),
    description: "",
    groupId: defaultGroupId,
    prizes: [],
    hostId: principal,
  });
  const [completedLottery, setCompletedLottery] = useState<CompletedLottery>({
    id: principal,
    title: "",
    participants: [],
    types: "",
    participantsAmount: BigInt(0),
    isCompleted: false,
    endedAt: BigInt(0),
    createdAt: BigInt(0),
    lotteryBanner: new Uint8Array(),
    description: "",
    prizes: [],
    hostId: principal,
    winners: [],
  });

  useEffect(() => {
    const fetchDataCompleted = async () => {
      if (slug) {
        try {
          const azle: AZLE = await makeAzleActor();
          const lottery = await azle.completedLotteryDetail(
            Principal.fromText(String(slug))
          );
          if ("Ok" in lottery) {
            setCompletedLottery(lottery.Ok);
          }
        } catch (error) {
          return;
        }
      }
    };

    const fetchData = async () => {
      if (slug) {
        try {
          const azle: AZLE = await makeAzleActor();
          const lottery = await azle.detailLottery(
            Principal.fromText(String(slug))
          );
          if ("Ok" in lottery) {
            setLottery(lottery.Ok);
            const isParticipant = lottery.Ok.participants.some(
              (participant) => participant.id.toString() == principal.toString()
            );
            if (isParticipant) {
              setCondition(LotteryType.Joined);
            }
            if (lottery.Ok.isCompleted) {
              setCondition(LotteryType.Completed);
              await fetchDataCompleted();
            }
          }
        } catch (error) {
          return;
        }
      }
    };

    if (!isAuthenticated) {
      login();
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, login, principal, slug]);

  const joinLottery = async () => {
    try {
      if (slug) {
        const azle: AZLE = await makeAzleActor();
        const join = await azle.joinLottery(
          Principal.fromText(String(slug)),
          principal
        );
        if ("Ok" in join) {
          setCondition(LotteryType.Joined);
        }
      }
    } catch (error) {
      return;
    }
  };

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining({
        days: Math.ceil(
          (new Date(Number(detailLottery.endedAt)).getTime() -
            new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        ),
        hours: Math.ceil(
          ((new Date(Number(detailLottery.endedAt)).getTime() -
            new Date().getTime()) %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.ceil(
          ((new Date(Number(detailLottery.endedAt)).getTime() -
            new Date().getTime()) %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        seconds: Math.ceil(
          ((new Date(Number(detailLottery.endedAt)).getTime() -
            new Date().getTime()) %
            (1000 * 60)) /
            1000
        ),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [detailLottery]);

  return (
    <>
      {condition === LotteryType.Public ||
      condition === LotteryType.Private ||
      condition === LotteryType.Joined ? (
        <Flex
          rounded={"xl"}
          bg={"white"}
          padding={"2rem"}
          direction={"column"}
          gap={"2rem"}
        >
          <Flex direction={"row"} gap={"5rem"}>
            <Flex direction={"column"} gap={"2rem"} w={"60%"}>
              <Flex align="center">
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    detailLottery.lotteryBanner
                  ).toString("base64")}`}
                  alt="thumbnail"
                  className="w-auto max-w-[20rem] mx-auto"
                />
              </Flex>
              <Flex align="center" gap={"1rem"}>
                <h1 className="text-2xl font-bold">Lottery ends in</h1>
                <Flex
                  align={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  gap={"0.5rem"}
                >
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">
                      {timeRemaining.days}
                    </h1>
                    <h2 className="text-lg font-bold text-danger">Days</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">
                      {timeRemaining.hours}
                    </h1>
                    <h2 className="text-lg font-bold text-danger">Hours</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">
                      {timeRemaining.minutes}
                    </h1>
                    <h2 className="text-lg font-bold text-danger">Mins</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">
                      {timeRemaining.seconds}
                    </h1>
                    <h2 className="text-lg font-bold text-danger">Secs</h2>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <h1 className="text-3xl font-bold">{detailLottery.title}</h1>
                <Flex
                  gap={"1rem"}
                  align={"center"}
                  className="border-t-[1px] border-b-[1px] border-black"
                  padding={"1rem"}
                >
                  <Flex direction={"column"} fontWeight={"semibold"}>
                    <p>Host</p>
                    <p>@user-${detailLottery?.hostId?.toString() || ""}</p>
                  </Flex>
                </Flex>
                <Flex align={"center"} gap={"2rem"} fontWeight={"semibold"}>
                  <Flex align="center">
                    <Image src={Calendar} alt="calendar" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p>
                      Created at :{" "}
                      {new Date(Number(detailLottery.createdAt)).toString()}
                    </p>
                    <p>
                      End at :{" "}
                      {new Date(Number(detailLottery.endedAt)).toString()}
                    </p>
                  </Flex>
                  <Flex align="center">
                    <Image src={Users} alt="users" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p>{Number(detailLottery.participantsAmount)}</p>
                    <p>Participants</p>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"} w={"40%"} gap={"2rem"}>
              <Flex direction={"column"} gap={"0.5rem"}>
                <h1 className="text-2xl font-bold">Lottery Description</h1>
                <p>{detailLottery.description}</p>
              </Flex>
              <Flex direction={"column"} gap={"0.5rem"}>
                <h1 className="text-2xl font-bold">{"Winner's Prizes"}</h1>
                {detailLottery.prizes.map((item, idx) => (
                  <Flex gap={"1rem"} align={"center"} key={idx}>
                    <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                      {Number(item.quantity)}
                    </div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"column"} gap={"1rem"}>
            <Flex>
              <h1 className="text-3xl font-bold">Participants</h1>
              <Spacer />
              <Link
                href={`/lotteries/${detailLottery.id}/participants?canisterId=${canisterId}`}
                className="underline font-semibold"
              >
                See all
              </Link>
            </Flex>
            <Flex direction={"column"} gap={"1rem"}>
              {detailLottery.participants &&
                detailLottery.participants.map((user, index) => (
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
                        <img
                          src={`data:image/png;base64,${Buffer.from(
                            user.avatar
                          ).toString("base64")}`}
                          alt="user"
                          className="w-[1.75rem]"
                        />
                      </Flex>
                      <Flex direction={"column"} fontWeight={"semibold"}>
                        <p>{user.name}</p>
                        <p>@user-{user.id.toString()}</p>
                      </Flex>
                      <Spacer />
                    </Flex>
                  </>
                ))}
              {detailLottery.participants.length === 0 ? (
                <h1 className="text-2xl mt-4 mx-auto text-center font-semibold">
                  No participants available yet.
                </h1>
              ) : (
                <></>
              )}
            </Flex>
          </Flex>
          <Flex direction={"row"}></Flex>
          {detailLottery?.hostId?.toString() !== principal?.toString() &&
          (condition === LotteryType.Public ||
            condition === LotteryType.Private) ? (
            <Button
              width={"8rem"}
              fontSize={"small"}
              className="!bg-primary-1-400"
              color={"white"}
              mx={"auto"}
              fontWeight={"bold"}
              onClick={() => joinLottery()}
            >
              JOIN LOTTERY
            </Button>
          ) : (
            <Button
              width={"8rem"}
              fontSize={"small"}
              className="!bg-primary-3-500"
              color={"white"}
              mx={"auto"}
              fontWeight={"bold"}
              disabled
            >
              ALREADY JOINED
            </Button>
          )}
        </Flex>
      ) : condition === LotteryType.Completed ? (
        <>
          <Flex padding={"2rem"} direction={"column"} gap={"3rem"}>
            <Flex direction={"row"} gap={"5rem"}>
              <Flex direction={"column"} gap={"2rem"} w={"60%"}>
                <Flex align="center">
                  <img
                    src={`data:image/png;base64,${Buffer.from(
                      completedLottery.lotteryBanner
                    ).toString("base64")}`}
                    alt="thumbnail"
                    className="w-full max-w-[20rem] mx-auto"
                  />
                </Flex>
                <Flex align="center" direction={"row"} gap={"1rem"} mx={"auto"}>
                  <Flex align="center">
                    <Image src={Users} alt="users" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p className="text-xl font-bold">
                      {Number(completedLottery.participantsAmount)} Participants
                    </p>
                  </Flex>
                </Flex>
                <Flex direction={"column"} gap={"0.5rem"}>
                  <h1 className="text-2xl font-bold">Description</h1>
                  <p className="p-4 bg-white shadow-xl rounded-lg">
                    {completedLottery.description}
                  </p>
                </Flex>
              </Flex>
              <Flex direction={"column"} w={"40%"} gap={"2rem"}>
                <Flex direction={"column"} gap={"1rem"}>
                  <h1 className="text-3xl font-bold">
                    {completedLottery.title}
                  </h1>
                  <Flex
                    gap={"1rem"}
                    align={"center"}
                    className="border-t-[1px] border-b-[1px] border-black"
                    padding={"1rem"}
                  >
                    <h1 className="text-2xl font-bold">Host</h1>
                    <Flex direction={"column"} fontWeight={"semibold"}>
                      <p>Host</p>
                      <p>@user-${completedLottery?.hostId?.toString() || ""}</p>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} gap={"2rem"} fontWeight={"semibold"}>
                    <Flex align="center">
                      <Image src={Calendar} alt="calendar" className="w-full" />
                    </Flex>
                    <Flex align="center" direction={"column"}>
                      <p>
                        Created at :{" "}
                        {new Date(
                          Number(completedLottery.createdAt)
                        ).toString()}
                      </p>
                      <p>
                        End at :{" "}
                        {new Date(Number(completedLottery.endedAt)).toString()}
                      </p>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction={"column"} gap={"0.5rem"}>
                  <h1 className="text-2xl font-bold">{"Winner's Prizes"}</h1>
                  {completedLottery.prizes.map((item, idx) => (
                    <Flex gap={"1rem"} align={"center"} key={idx}>
                      <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                        {Number(item.quantity)}
                      </div>
                      <h2 className="text-xl font-bold">{item.name}</h2>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={"1rem"}>
              <Flex>
                <h1 className="text-3xl font-bold">Winners</h1>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                {completedLottery.winners &&
                  completedLottery.winners.map((user, index) => (
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
                          <img
                            src={`data:image/png;base64,${Buffer.from(
                              user.avatar
                            ).toString("base64")}`}
                            alt="user"
                            className="w-[1.75rem]"
                          />
                        </Flex>
                        <Flex direction={"column"} fontWeight={"semibold"}>
                          <p>{user.name}</p>
                          <p>@user-{user.id.toString()}</p>
                        </Flex>
                        <Spacer />
                      </Flex>
                    </>
                  ))}
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={"1rem"}>
              <Flex>
                <h1 className="text-3xl font-bold">Participants</h1>
                <Spacer />
                <Link
                  href={`/lotteries/${completedLottery.id}/participants?canisterId=${canisterId}`}
                  className="underline font-semibold"
                >
                  See all
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                {completedLottery.participants &&
                  completedLottery.participants
                    .slice(0, 5)
                    .map((user, index) => (
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
                            <img
                              src={`data:image/png;base64,${Buffer.from(
                                user.avatar
                              ).toString("base64")}`}
                              alt="user"
                              className="w-[1.75rem]"
                            />
                          </Flex>
                          <Flex direction={"column"} fontWeight={"semibold"}>
                            <p>{user.name}</p>
                            <p>@user-{user.id.toString()}</p>
                          </Flex>
                          <Spacer />
                        </Flex>
                      </>
                    ))}
                {completedLottery.participants.length === 0 ? (
                  <h1 className="text-2xl mt-4 mx-auto text-center font-semibold">
                    No participants available yet.
                  </h1>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Page;
