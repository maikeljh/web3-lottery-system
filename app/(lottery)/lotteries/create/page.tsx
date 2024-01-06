"use client";

import Card from "@/components/common/Card";
import Banner from "../../../../public/assets/banner.png";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

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
          <Flex direction={"row"} gap={"2rem"} wrap={"wrap"}>
            <Flex></Flex>
            <Flex></Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Page;
