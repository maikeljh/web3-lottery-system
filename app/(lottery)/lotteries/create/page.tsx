/* eslint-disable @next/next/no-img-element */
"use client";

import Card from "@/components/common/Card";
import { Button, Flex } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import Add from "../../../../public/assets/add.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { makeAzleActor } from "@/service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { Principal } from "@dfinity/principal";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/use-auth-client";
import Banner from "../../../../public/assets/banner.png";

enum LotteryType {
  Private = "PRIVATE",
  Public = "PUBLIC",
  Group = "GROUP",
}

interface Lottery {
  title: string;
  types: string;
  endedAt: bigint;
  createdAt: bigint;
  lotteryBanner: Uint8Array | number[];
  description: string;
  groupId: [] | [Principal];
  prizes: Array<{ name: string; quantity: bigint }>;
  hostId: Principal;
}

const Page = () => {
  const [phase, setPhase] = useState("pick");
  const router = useRouter();
  const canisterId =
    useSearchParams().get("canisterId") || localStorage.getItem("canisterId");
  const data = [
    {
      title: "Public Lottery",
      description: (
        <p>
          A Public Lottery is an inclusive and open-to-all lottery where
          everyone can join for a chance to win exciting prizes
        </p>
      ),
    },
    {
      title: "Private Lottery",
      description: (
        <p>
          A Private Lottery is an exclusive lottery where participation is by
          invitation only, ensuring that only privileged people can seize the
          chance to win prizes.
        </p>
      ),
    },
    {
      title: "Group Lottery",
      description: (
        <p>
          A Group Lottery is an exclusive lottery crafted specifically for
          particular communities or organizations, ensuring that only those
          within the group can join in the excitement and have a chance to win.
        </p>
      ),
    },
  ];

  const [prize, setPrize] = useState([
    {
      quantity: BigInt(1),
      name: "",
    },
  ]);

  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(Add);
  const [file, setFile] = useState<File>();
  const defaultGroupId: [] = [];
  const { principal, isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      login();
      return;
    }
  }, [isAuthenticated, login]);

  const [payload, setPayload] = useState<Lottery>({
    title: "",
    types: LotteryType["Public"],
    endedAt: BigInt(0),
    createdAt: BigInt(new Date().getTime()),
    lotteryBanner: new Uint8Array(),
    description: "",
    groupId: defaultGroupId,
    prizes: [],
    hostId: principal,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e?.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        setPayload({ ...payload, lotteryBanner: uint8Array });
      };

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const createLottery = async () => {
    try {
      const azle: AZLE = await makeAzleActor();
      const lottery = await azle.createLottery({
        ...payload,
        createdAt: BigInt(new Date().getTime()),
        prizes: prize,
        hostId: principal,
      });
      if ("Ok" in lottery) {
        router.replace(`/lotteries/${lottery.Ok.id}?canisterId=${canisterId}`);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      {phase === "pick" ? (
        <Flex direction={"column"} gap={"2rem"}>
          <h1 className="text-3xl font-bold">Pick a Lottery Type to Host</h1>
          <Flex direction={"row"} gap={"2rem"} wrap={"wrap"}>
            {data &&
              data.map((card) => (
                <>
                  <Card
                    title={card.title}
                    description={card.description}
                    basis={"23%"}
                    onClick={() => {
                      if (card.title === "Group Lottery") {
                        setPhase(LotteryType.Group);
                        setPayload({ ...payload, types: LotteryType.Group });
                      } else if (card.title === "Public Lottery") {
                        setPhase(LotteryType.Public);
                        setPayload({ ...payload, types: LotteryType.Public });
                      } else if (card.title === "Private Lottery") {
                        setPhase(LotteryType.Private);
                        setPayload({ ...payload, types: LotteryType.Private });
                      }
                    }}
                  />
                </>
              ))}
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"} gap={"2rem"}>
          <h1 className="text-3xl font-bold">Create a Lottery</h1>
          <Flex
            direction={"row"}
            gap={"2rem"}
            bg={"white"}
            padding={"2rem"}
            shadow={"xl"}
            rounded={"lg"}
          >
            <Flex direction={"column"} gap={"2rem"} width={"50%"}>
              <Flex gap={"1rem"} align={"center"}>
                <h1 className="text-2xl font-bold min-w-[12rem]">
                  Lottery Name<span className="text-danger">*</span>
                </h1>
                <input
                  type="text"
                  value={payload.title}
                  onChange={(e) =>
                    setPayload({ ...payload, title: e.target.value })
                  }
                  required
                  className="border-2 rounded-lg w-full p-2"
                />
              </Flex>
              <div className="w-full">
                <label htmlFor="file-input" className="cursor-pointer">
                  {typeof imageSrc === "string" ? (
                    <img
                      src={imageSrc}
                      alt="Add thumbnail"
                      className="max-h-[200px] mx-auto"
                    />
                  ) : (
                    <Image
                      src={imageSrc}
                      alt="Add thumbnail"
                      className="w-full"
                    />
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="file-input"
                  onChange={handleFileChange}
                />
              </div>
              <Flex direction={"column"} gap={"1rem"}>
                <h1 className="text-2xl font-bold min-w-[12rem]">
                  Lottery Description<span className="text-danger">*</span>
                </h1>
                <textarea
                  className="w-full min-h-[8rem] border-2 p-2 rounded-lg"
                  value={payload.description}
                  onChange={(e) =>
                    setPayload({ ...payload, description: e.target.value })
                  }
                />
              </Flex>
              {phase === LotteryType.Group ? (
                <Flex gap={"1rem"} align={"center"}>
                  <Flex direction={"column"} gap={"1rem"} w={"50%"}>
                    <h1 className="text-2xl font-bold min-w-[12rem]">
                      Lottery End Date<span className="text-danger">*</span>
                    </h1>
                    <input
                      type="date"
                      className="p-2 border-2 rounded-lg"
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          endedAt: BigInt(new Date(e.target.value).getTime()),
                        })
                      }
                    />
                  </Flex>
                  <Flex direction={"column"} gap={"1rem"} w={"50%"}>
                    <h1 className="text-2xl font-bold min-w-[12rem]">
                      Lottery Group<span className="text-danger">*</span>
                    </h1>
                    <select className="p-2 border-2 rounded-lg">
                      <option>Anjay</option>
                    </select>
                  </Flex>
                </Flex>
              ) : (
                <Flex direction={"column"} gap={"1rem"}>
                  <h1 className="text-2xl font-bold min-w-[12rem]">
                    Lottery End Date<span className="text-danger">*</span>
                  </h1>
                  <input
                    type="date"
                    className="p-2 border-2 rounded-lg"
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        endedAt: BigInt(new Date(e.target.value).getTime()),
                      })
                    }
                  />
                </Flex>
              )}
            </Flex>
            <Flex direction={"column"} gap={"2rem"} width={"50%"}>
              <Flex gap={"1rem"} align={"center"}>
                <h1 className="text-2xl font-bold min-w-[12rem]">
                  Lottery Winner Prizes<span className="text-danger">*</span>
                </h1>
                <Button
                  width={"6rem"}
                  fontSize={"small"}
                  className="!bg-primary-1-400"
                  color={"white"}
                  onClick={() => createLottery()}
                >
                  Save Lottery
                </Button>
              </Flex>
              <Flex gap={"1rem"} align={"center"}>
                <Flex gap={"1rem"} direction={"column"}>
                  <h1 className="text-2xl font-bold min-w-[12rem]">Amount</h1>
                  {prize &&
                    prize.map((el, idx) => (
                      <input
                        type="number"
                        className="w-full border-2 p-2"
                        key={idx}
                        value={Number(el.quantity)}
                        onChange={(e) => {
                          let tempPrize = [...prize];
                          tempPrize[idx].quantity = BigInt(e.target.value);
                          setPrize(tempPrize);
                        }}
                      />
                    ))}
                </Flex>
                <Flex gap={"1rem"} direction={"column"} className="w-full">
                  <h1 className="text-2xl font-bold min-w-[12rem]">Prize</h1>
                  {prize &&
                    prize.map((el, idx) => (
                      <input
                        type="number"
                        className="w-full border-2 p-2"
                        key={idx}
                        value={el.name}
                        onChange={(e) => {
                          let tempPrize = [...prize];
                          tempPrize[idx].name = e.target.value;
                          setPrize(tempPrize);
                        }}
                      />
                    ))}
                </Flex>
                <Flex gap={"1rem"} direction={"column"} align={"center"}>
                  <h1 className="text-2xl font-bold min-w-[4rem] text-center">
                    Add
                  </h1>
                  {prize &&
                    prize.map((e, idx) => (
                      <Button
                        width={"2rem"}
                        fontSize={"xl"}
                        className="!bg-primary-1-400"
                        color={"white"}
                        key={idx}
                        onClick={() =>
                          setPrize([
                            ...prize,
                            {
                              quantity: BigInt(0),
                              name: "",
                            },
                          ])
                        }
                      >
                        +
                      </Button>
                    ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Page;
