"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import Thumbnail from "../../../../public/assets/thumbnail.png";
import Leader from "../../../../public/assets/leader.png";
import Calendar from "../../../../public/assets/calendar.png";
import Users from "../../../../public/assets/users.png";
import Link from "next/link";

const Page = () => {
  const [condition, setCondition] = useState("public");
  const [data, setData] = useState([
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
    {
      username: "username",
      name: "Sebastian",
      joined: "2 min ago",
    },
  ]);
  return (
    <>
      {condition === "public" || condition === "joined" ? (
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
                <Image src={Thumbnail} alt="thumbnail" className="w-full" />
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
                    <h1 className="text-2xl font-bold text-danger">00</h1>
                    <h2 className="text-lg font-bold text-danger">Days</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">20</h1>
                    <h2 className="text-lg font-bold text-danger">Hours</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">17</h1>
                    <h2 className="text-lg font-bold text-danger">Mins</h2>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">:</h1>
                  </Flex>
                  <Flex direction={"column"}>
                    <h1 className="text-2xl font-bold text-danger">12</h1>
                    <h2 className="text-lg font-bold text-danger">Secs</h2>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <h1 className="text-3xl font-bold">Lottery Name</h1>
                <Flex
                  gap={"1rem"}
                  align={"center"}
                  className="border-t-[1px] border-b-[1px] border-black"
                  padding={"1rem"}
                >
                  <Flex
                    align="center"
                    className="border-2 border-primary-2-400 rounded-full"
                  >
                    <Image
                      src={Leader}
                      alt="user"
                      className="w-[3rem] h-[3rem]"
                    />
                  </Flex>
                  <Flex direction={"column"} fontWeight={"semibold"}>
                    <p>Sebastian</p>
                    <p>@username</p>
                  </Flex>
                </Flex>
                <Flex align={"center"} gap={"2rem"} fontWeight={"semibold"}>
                  <Flex align="center">
                    <Image src={Calendar} alt="calendar" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p>Created at : 10/12/23</p>
                    <p>End at : 10/12/23</p>
                  </Flex>
                  <Flex align="center">
                    <Image src={Users} alt="users" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p>30,000</p>
                    <p>Participants</p>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"} w={"40%"} gap={"2rem"}>
              <Flex direction={"column"} gap={"0.5rem"}>
                <h1 className="text-2xl font-bold">Lottery Description</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Eros in cursus turpis massa tincidunt dui. Scelerisque in
                  dictum non consectetur a. Id eu nisl nunc mi ipsum faucibus
                  vitae aliquet nec. Cras adipiscing enim eu turpis egestas .
                </p>
              </Flex>
              <Flex direction={"column"} gap={"0.5rem"}>
                <h1 className="text-2xl font-bold">{"Winner's Prizes"}</h1>
                <Flex gap={"1rem"} align={"center"}>
                  <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                    1
                  </div>
                  <h2 className="text-xl font-bold">100 BTC</h2>
                </Flex>
                <Flex gap={"1rem"} align={"center"}>
                  <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                    2
                  </div>
                  <h2 className="text-xl font-bold">50 BTC</h2>
                </Flex>
                <Flex gap={"1rem"} align={"center"}>
                  <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                    3
                  </div>
                  <h2 className="text-xl font-bold">20 BTC</h2>
                </Flex>
                <Flex gap={"1rem"} align={"center"}>
                  <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                    4-10
                  </div>
                  <h2 className="text-xl font-bold">10 BTC</h2>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"column"} gap={"1rem"}>
            <Flex>
              <h1 className="text-3xl font-bold">Participants</h1>
              <Spacer />
              <Link
                href="/lotteries/1/participants"
                className="underline font-semibold"
              >
                See all
              </Link>
            </Flex>
            <Flex direction={"column"} gap={"1rem"}>
              {data &&
                data.map((user, index) => (
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
                        <Image
                          src={Leader}
                          alt="user"
                          className="w-[1.75rem]"
                        />
                      </Flex>
                      <Flex direction={"column"} fontWeight={"semibold"}>
                        <p>{user.name}</p>
                        <p>@{user.username}</p>
                      </Flex>
                      <Spacer />
                      <p className="font-semibold">{user.joined}</p>
                    </Flex>
                  </>
                ))}
            </Flex>
          </Flex>
          <Flex direction={"row"}></Flex>
          {condition === "public" ? (
            <Button
              width={"8rem"}
              fontSize={"small"}
              className="!bg-primary-1-400"
              color={"white"}
              mx={"auto"}
              fontWeight={"bold"}
              onClick={() => setCondition("joined")}
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
            >
              ALREADY JOINED
            </Button>
          )}
        </Flex>
      ) : condition === "completed" ? (
        <>
          <Flex padding={"2rem"} direction={"column"} gap={"3rem"}>
            <Flex direction={"row"} gap={"5rem"}>
              <Flex direction={"column"} gap={"2rem"} w={"60%"}>
                <Flex align="center">
                  <Image src={Thumbnail} alt="thumbnail" className="w-full" />
                </Flex>
                <Flex align="center" direction={"row"} gap={"1rem"} mx={"auto"}>
                  <Flex align="center">
                    <Image src={Users} alt="users" className="w-full" />
                  </Flex>
                  <Flex align="center" direction={"column"}>
                    <p className="text-xl font-bold">30,000 Participants</p>
                  </Flex>
                </Flex>
                <Flex direction={"column"} gap={"0.5rem"}>
                  <h1 className="text-2xl font-bold">Description</h1>
                  <p className="p-4 bg-white shadow-xl rounded-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Eros in cursus turpis massa tincidunt dui.
                    Scelerisque in dictum non consectetur a. Id eu nisl nunc mi
                    ipsum faucibus vitae aliquet nec. Cras adipiscing enim eu
                    turpis egestas .
                  </p>
                </Flex>
              </Flex>
              <Flex direction={"column"} w={"40%"} gap={"2rem"}>
                <Flex direction={"column"} gap={"1rem"}>
                  <h1 className="text-3xl font-bold">Lottery Name</h1>
                  <Flex
                    gap={"1rem"}
                    align={"center"}
                    className="border-t-[1px] border-b-[1px] border-black"
                    padding={"1rem"}
                  >
                    <h1 className="text-2xl font-bold">Host</h1>
                    <Flex
                      align="center"
                      className="border-2 border-primary-2-400 rounded-full"
                    >
                      <Image
                        src={Leader}
                        alt="user"
                        className="w-[3rem] h-[3rem]"
                      />
                    </Flex>
                    <Flex direction={"column"} fontWeight={"semibold"}>
                      <p>Sebastian</p>
                      <p>@username</p>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} gap={"2rem"} fontWeight={"semibold"}>
                    <Flex align="center">
                      <Image src={Calendar} alt="calendar" className="w-full" />
                    </Flex>
                    <Flex align="center" direction={"column"}>
                      <p>Created at : 10/12/23</p>
                      <p>End at : 10/12/23</p>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction={"column"} gap={"0.5rem"}>
                  <h1 className="text-2xl font-bold">{"Winner's Prizes"}</h1>
                  <Flex gap={"1rem"} align={"center"}>
                    <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                      1
                    </div>
                    <h2 className="text-xl font-bold">100 BTC</h2>
                  </Flex>
                  <Flex gap={"1rem"} align={"center"}>
                    <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                      2
                    </div>
                    <h2 className="text-xl font-bold">50 BTC</h2>
                  </Flex>
                  <Flex gap={"1rem"} align={"center"}>
                    <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                      3
                    </div>
                    <h2 className="text-xl font-bold">20 BTC</h2>
                  </Flex>
                  <Flex gap={"1rem"} align={"center"}>
                    <div className="rounded-[50%] bg-primary-2-400 w-12 h-12 flex items-center justify-center text-white text-xl">
                      4-10
                    </div>
                    <h2 className="text-xl font-bold">10 BTC</h2>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={"1rem"}>
              <Flex>
                <h1 className="text-3xl font-bold">Winners</h1>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                {data &&
                  data.map((user, index) => (
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
                          <Image
                            src={Leader}
                            alt="user"
                            className="w-[1.75rem]"
                          />
                        </Flex>
                        <Flex direction={"column"} fontWeight={"semibold"}>
                          <p>{user.name}</p>
                          <p>@{user.username}</p>
                        </Flex>
                        <Spacer />
                        <p className="font-semibold">Iphone 15</p>
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
                  href="/lotteries/1/participants"
                  className="underline font-semibold"
                >
                  See all
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                {data &&
                  data.map((user, index) => (
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
                          <Image
                            src={Leader}
                            alt="user"
                            className="w-[1.75rem]"
                          />
                        </Flex>
                        <Flex direction={"column"} fontWeight={"semibold"}>
                          <p>{user.name}</p>
                          <p>@{user.username}</p>
                        </Flex>
                        <Spacer />
                        <p className="font-semibold">{user.joined}</p>
                      </Flex>
                    </>
                  ))}
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : condition === "notify" ? (
        <>
          <Flex direction={"column"} gap={"1rem"}>
            <h1 className="text-3xl font-bold text-center">@username</h1>
            <Flex
              align="center"
              className="border-3 border-primary-2-400 rounded-full w-full mx-auto"
              direction={"column"}
            >
              <Image
                src={Leader}
                alt="leader"
                className="w-[12rem] h-[12rem]"
              />
            </Flex>
            <h1 className="text-5xl font-bold text-center">CONGRATULATIONS!</h1>
            <Flex bg={"white"} padding={"1rem"} shadow={"xl"} rounded={"lg"}>
              <p className="text-2xl font-semibold text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eros
                in cursus turpis massa tincidunt dui. Scelerisque in dictum non
                consectetur a. Id eu nisl nunc mi ipsum faucibus vitae aliquet
                nec. Cras adipiscing enim eu turpis egestas .
              </p>
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
