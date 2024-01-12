/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import { makeAzleActor } from "../../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/use-auth-client";
import { Principal } from "@dfinity/principal";

interface Winners {
  id: Principal;
  hostedLotteries: Principal[];
  name: string;
  participatedLotteries: Principal[];
  points: bigint;
  avatar: Uint8Array | number[];
}

const Page = () => {
  const [winners, setWinners] = useState<Winners[]>([]);
  const [maxWinner, setMaxWinner] = useState(5);
  const router = useRouter();
  const { principal, logout, isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const azle: AZLE = await makeAzleActor();
        const users = await azle.getLeaderboard();
        console.log(users);
        if ("Ok" in users) {
          setWinners(users.Ok);
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
  }, [isAuthenticated, login, principal, router]);

  const loadMore = () => {
    setMaxWinner(maxWinner + 5);
  };

  return (
    <>
      <Flex direction={"column"} gap={"1rem"}>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Flex direction={"row"} className="w-full mt-24">
          <Flex className="w-1/2 mx-auto text-white" direction={"row"}>
            <div className="w-full text-center bg-primary-1-600 h-3/5 mt-auto p-4 rounded-tl-xl rounded-bl-xl relative pb-[9rem]">
              {winners && winners[1] && (
                <>
                  <Flex
                    align="center"
                    className="bg-white border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                    direction={"column"}
                  >
                    <img
                      src={`data:image/png;base64,${Buffer.from(
                        winners[1].avatar
                      ).toString("base64")}`}
                      alt="leader"
                      className="w-[7rem]"
                    />
                    <div className="absolute bottom-[-8px]">
                      <div className="relative">
                        <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                          <span className="transform -rotate-45 text-white text-xs font-bold">
                            2
                          </span>
                        </div>
                      </div>
                    </div>
                  </Flex>
                  <p className="mt-8">{winners[1].name}</p>
                  <p>{Number(winners[1].points)} points</p>
                  <p>@user-{winners[1].id.toString()}</p>
                </>
              )}
            </div>
            {winners && winners[0] && (
              <div className="w-full text-center bg-primary-1-500 p-4 rounded-tl-xl rounded-tr-xl relative">
                <Flex
                  align="center"
                  className="bg-white border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                  direction={"column"}
                >
                  <img
                    src={`data:image/png;base64,${Buffer.from(
                      winners[0].avatar
                    ).toString("base64")}`}
                    alt="leader"
                    className="w-[7rem]"
                  />
                  <div className="absolute bottom-[-8px]">
                    <div className="relative">
                      <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                        <span className="transform -rotate-45 text-white text-xs font-bold">
                          1
                        </span>
                      </div>
                    </div>
                  </div>
                </Flex>
                <p className="mt-8">{winners[0].name}</p>
                <p>{Number(winners[0].points)} points</p>
                <p>@user-{winners[0].id.toString()}</p>
                <div className="h-[6rem]"></div>
              </div>
            )}

            <div className="w-full text-center bg-primary-1-600 h-3/5 mt-auto p-4 rounded-tr-xl rounded-br-xl relative pb-[9rem]">
              {winners && winners[2] && (
                <>
                  <Flex
                    align="center"
                    className="bg-white border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[50px]"
                    direction={"column"}
                  >
                    <img
                      src={`data:image/png;base64,${Buffer.from(
                        winners[2].avatar
                      ).toString("base64")}`}
                      alt="leader"
                      className="w-[7rem]"
                    />
                    <div className="absolute bottom-[-8px]">
                      <div className="relative">
                        <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                          <span className="transform -rotate-45 text-white text-xs font-bold">
                            3
                          </span>
                        </div>
                      </div>
                    </div>
                  </Flex>
                  <p className="mt-8">{winners[2].name}</p>
                  <p>{Number(winners[2].points)} points</p>
                  <p>@user-{winners[2].id.toString()}</p>
                </>
              )}
            </div>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"1rem"}>
          {winners &&
            winners.slice(3, maxWinner).map((user, index) => (
              <>
                <Flex
                  bg="white"
                  padding={"1rem"}
                  className="shadow-lg"
                  gap={"1rem"}
                  align={"center"}
                >
                  <div className="relative">
                    <div className="w-5 h-5 bg-primary-2-400 transform rotate-45 flex items-center justify-center rounded-sm">
                      <span className="transform -rotate-45 text-white text-xs font-bold">
                        {index + 4}
                      </span>
                    </div>
                  </div>
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
                  <p className="font-semibold">{Number(user.points)} points</p>
                </Flex>
              </>
            ))}
        </Flex>
        {maxWinner < winners.length ? (
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
    </>
  );
};

export default Page;
