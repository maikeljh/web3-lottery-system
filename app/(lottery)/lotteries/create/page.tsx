/* eslint-disable @next/next/no-img-element */
"use client";

import Card from "@/components/common/Card";
import Banner from "../../../../public/assets/banner.png";
import { Button, Flex } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import Add from "../../../../public/assets/add.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const Page = () => {
  const [phase, setPhase] = useState("pick");
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
      amount: 1,
      prize: "",
    },
  ]);

  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(Add);
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
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
                    image={Banner}
                    title={card.title}
                    description={card.description}
                    basis={"23%"}
                    onClick={() => {
                      if (card.title !== "Group Lottery") {
                        setPhase("default");
                      } else {
                        setPhase("group");
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
                <textarea className="w-full min-h-[8rem] border-2 p-2 rounded-lg" />
              </Flex>
              {phase === "group" ? (
                <Flex gap={"1rem"} align={"center"}>
                  <Flex direction={"column"} gap={"1rem"} w={"50%"}>
                    <h1 className="text-2xl font-bold min-w-[12rem]">
                      Lottery End Date<span className="text-danger">*</span>
                    </h1>
                    <input type="date" className="p-2 border-2 rounded-lg" />
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
                  <input type="date" className="p-2 border-2 rounded-lg" />
                </Flex>
              )}
            </Flex>
            <Flex direction={"column"} gap={"2rem"} width={"50%"}>
              <Flex gap={"1rem"} align={"center"}>
                <h1 className="text-2xl font-bold min-w-[12rem]">
                  Lottery Winner Prizes<span className="text-danger">*</span>
                </h1>
                <Link href="/lotteries/1" className="ml-auto">
                  <Button
                    width={"6rem"}
                    fontSize={"small"}
                    className="!bg-primary-1-400"
                    color={"white"}
                  >
                    Save Lottery
                  </Button>
                </Link>
              </Flex>
              <Flex gap={"1rem"} align={"center"}>
                <Flex gap={"1rem"} direction={"column"}>
                  <h1 className="text-2xl font-bold min-w-[12rem]">Amount</h1>
                  {prize &&
                    prize.map((prize, idx) => (
                      <input
                        type="number"
                        className="w-full border-2 p-2"
                        key={idx}
                        value={prize.amount}
                      />
                    ))}
                </Flex>
                <Flex gap={"1rem"} direction={"column"} className="w-full">
                  <h1 className="text-2xl font-bold min-w-[12rem]">Prize</h1>
                  {prize &&
                    prize.map((prize, idx) => (
                      <input
                        type="number"
                        className="w-full border-2 p-2"
                        key={idx}
                        value={prize.prize}
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
                              amount: 0,
                              prize: "",
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
