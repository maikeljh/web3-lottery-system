"use client";
import { useState } from "react";
import { makeAzleActor } from "../service/actor";
import { Box, Button, Center } from "@chakra-ui/react";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import Modal1 from "../components/modals/FailedToJoinLottery";

export default function Home() {
  const [message, setMessage] = useState<number>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const azle: AZLE = await makeAzleActor();
      const getRandomNumber = await azle.randomNumber();
      console.log("getRandomNumber ", getRandomNumber);
      setMessage(getRandomNumber);
      setLoading(false);
    } catch (error) {
      setMessage(error as unknown as any);
      setLoading(false);
    }
  };
  // return <div>Home</div>;
  return <Modal1></Modal1>;
}
