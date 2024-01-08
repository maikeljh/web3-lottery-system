/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Flex } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useState } from "react";
import Add from "../../../../public/assets/add.png";
import Link from "next/link";

const Page = () => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(Add);
  const [file, setFile] = useState<File>();
  const [roles, setRoles] = useState([""]);
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
    <Flex
      bg={"white"}
      rounded={"xl"}
      padding={"2rem"}
      direction={"column"}
      gap={"1.5rem"}
    >
      <h1 className="text-2xl font-bold">New Group</h1>
      <div className="w-1/2 mx-auto">
        <label htmlFor="file-input" className="cursor-pointer">
          {typeof imageSrc === "string" ? (
            <img
              src={imageSrc}
              alt="Add thumbnail"
              className="max-h-[200px] mx-auto"
            />
          ) : (
            <Image src={imageSrc} alt="Add thumbnail" className="w-full" />
          )}
        </label>
        <input
          type="file"
          className="hidden"
          id="file-input"
          onChange={handleFileChange}
        />
      </div>
      <Flex
        direction={"row"}
        gap={"2rem"}
        mx={"auto"}
        className="w-full"
        align={"center"}
        justify={"center"}
      >
        <Flex direction={"column"} gap={"1rem"} mb={"auto"}>
          <h1 className="text-2xl font-bold">
            Group Name<span className="text-danger">*</span>
          </h1>
          <h1 className="text-2xl font-bold">
            Roles<span className="text-danger">*</span>
          </h1>
        </Flex>
        <Flex direction={"column"} className="w-3/4" gap={"1rem"}>
          <input type="text" className="p-2 border-2 w-full" />
          {roles &&
            roles.map((item, idx) => (
              <Flex gap={"1rem"} key={idx}>
                <input type="text" className="p-2 border-2 w-full" />
                <Button
                  width={"2rem"}
                  fontSize={"xl"}
                  className="!bg-primary-1-400"
                  color={"white"}
                  onClick={() => setRoles([...roles, ""])}
                >
                  +
                </Button>
              </Flex>
            ))}
        </Flex>
      </Flex>
      <Link href={"/groups/1"} className="mx-auto">
        <Button
          width={"8rem"}
          fontSize={"small"}
          className="!bg-primary-1-400"
          color={"white"}
          mx={"auto"}
          fontWeight={"bold"}
          shadow={"lg"}
        >
          CREATE GROUP
        </Button>
      </Link>
    </Flex>
  );
};

export default Page;
