/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/use-auth-client";
import { makeAzleActor } from "@/service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { Principal } from "@dfinity/principal";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

interface Participants {
  id: Principal;
  hostedLotteries: Principal[];
  name: string;
  participatedLotteries: Principal[];
  points: bigint;
  avatar: Uint8Array | number[];
}

const Page = () => {
  const [listOfParticipants, setParticipants] = useState<Participants[]>([]);
  const [max, setMax] = useState(10);
  const { slug } = useParams();
  const { principal, isAuthenticated, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        try {
          const azle: AZLE = await makeAzleActor();
          const participants = await azle.detailLottery(
            Principal.fromText(String(slug))
          );
          if ("Ok" in participants) {
            setParticipants(participants.Ok.participants);
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
  }, [isAuthenticated, login, principal, slug]);

  const loadMore = () => {
    setMax(max + 5);
  };

  return (
    <>
      <Flex direction={"column"} bg={"white"} padding={"2rem"}>
        <h1 className="text-3xl font-bold border-b-2 border-black pb-6">
          Participants
        </h1>
        <Flex direction={"column"}>
          {listOfParticipants &&
            listOfParticipants.map((user, index) => (
              <>
                <Flex
                  padding={"1rem"}
                  gap={"1rem"}
                  align={"center"}
                  className="border-b-2 border-black"
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
        {listOfParticipants.length === 0 ? (
          <h1 className="text-3xl mx-auto text-center mt-12 font-semibold">
            No participants available yet.
          </h1>
        ) : (
          <></>
        )}
        {max < listOfParticipants.length ? (
          <Flex align={"center"} padding={"1rem"} width={"full"} mt={"1rem"}>
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
