/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { makeAzleActor } from "../../../service/actor";
import { _SERVICE as AZLE } from "@/config/declarations/dfx_generated/azle.did";
import { useAuth } from "@/app/use-auth-client";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    points: 0,
  });
  const [avatar, setAvatar] = useState<number[] | Uint8Array>();
  const router = useRouter();
  const { principal, logout, isAuthenticated, login } = useAuth();
  const canisterId =
    useSearchParams().get("canisterId") || localStorage.getItem("canisterId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const azle: AZLE = await makeAzleActor();
        const user = await azle.getUser(principal);
        if ("Ok" in user) {
          setProfile({
            username: String(user.Ok?.id),
            name: user.Ok?.name,
            points: Number(user.Ok?.points),
          });
          setAvatar(user.Ok?.avatar);
          localStorage.setItem(
            "profile",
            JSON.stringify({
              username: String(user.Ok?.id),
              name: user.Ok?.name,
              points: Number(user.Ok?.points),
              avatar: user.Ok?.avatar,
            })
          );
        } else {
          router.push(`/profile/create?canisterId=${canisterId}`);
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
  }, [isAuthenticated, login, principal, router, canisterId]);

  const handleLogout = () => {
    router.replace("/");
    localStorage.removeItem("profile");
    logout();
  };

  return (
    <>
      <Flex direction={"column"}>
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mx-auto w-1/3 bg-primary-1-500 h-3/5 mt-[6rem] p-4 rounded-tr-xl rounded-xl relative">
          <Flex direction={"column"} gap={"0.75rem"}>
            <Flex
              align="center"
              className="border-3 border-primary-2-400 rounded-full w-[7rem] mx-auto absolute top-[-80px] left-[37%]"
              direction={"column"}
            >
              {avatar && (
                <img
                  src={`data:image/png;base64,${Buffer.from(avatar).toString(
                    "base64"
                  )}`}
                  alt="leader"
                  className="w-[7rem]"
                />
              )}
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="mt-12 text-lg font-semibold text-white">Name</p>
              <p className="bg-white p-2 rounded-lg">{profile.name}</p>
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Username</p>
              <p className="bg-white p-2 rounded-lg">
                @user-{profile.username}
              </p>
            </Flex>
            <Flex direction={"column"} gap={"0.25rem"}>
              <p className="text-lg font-semibold text-white">Points</p>
              <p className="bg-white p-2 rounded-lg">{profile.points}</p>
            </Flex>
            <Button mt={"1rem"} onClick={() => handleLogout()}>
              Logout
            </Button>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default Page;
