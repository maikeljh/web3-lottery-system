"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Leader from "../../../../public/assets/leader.png";
import { ChangeEvent, useEffect, useState } from "react";
import { makeAzleActor } from "../../../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { useAuth } from "@/app/use-auth-client";
import { useRouter } from "next/navigation";

const Page = () => {
  const [profile, setProfile] = useState({
    name: "",
    avatar: new Uint8Array(),
  });
  const router = useRouter();
  const { isAuthenticated, login, principal } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      login();
      return;
    }

    if (localStorage.getItem("profile")) {
      router.push("/profile");
    }
  }, [isAuthenticated, login, router]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the result to Uint8Array
        const uint8Array = new Uint8Array(reader.result as ArrayBuffer);

        // Update the profile state with the Uint8Array
        setProfile({ ...profile, avatar: uint8Array });
      };

      // Read the contents of the file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  };

  const create = async () => {
    try {
      const azle: AZLE = await makeAzleActor();
      const user = await azle.createUser({
        name: profile.name,
        avatar: profile.avatar,
        id: principal,
      });
      console.log(user);
      if ("Ok" in user) {
        router.push("/");
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Flex direction={"column"} gap={"1.5rem"}>
        <h1 className="text-3xl font-bold text-center">Create Profile</h1>
        <div className="mx-auto w-1/3 bg-primary-1-500 h-3/5 p-4 rounded-tr-xl rounded-xl relative">
          <Flex direction={"column"} gap={"0.75rem"}>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Avatar</p>
              <input
                className="bg-white p-2 rounded-lg"
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e)}
              />
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Name</p>
              <input
                className="bg-white p-2 rounded-lg"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </Flex>
            <Button mt={"1rem"} onClick={() => create()}>
              Create
            </Button>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default Page;
