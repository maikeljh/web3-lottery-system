import { Flex } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { MouseEventHandler, ReactElement } from "react";

interface CardProps {
  image: StaticImageData;
  title: string;
  description: ReactElement;
  basis?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  basis = "25%",
  onClick,
}) => {
  return (
    <Flex
      padding={"1rem"}
      backgroundColor={"white"}
      w={"full"}
      align={"center"}
      justifyContent={"center"}
      textAlign={"center"}
      rounded={"lg"}
      flexBasis={basis}
      flexGrow={1}
      shadow={"xl"}
      onClick={onClick}
      cursor={"pointer"}
    >
      <Flex direction={"column"} gap={"10px"} w={"full"} mb={"auto"}>
        <Flex align="center">
          <Image src={image} alt="banner" className="w-full" />
        </Flex>
        <p className="font-bold text-lg">{title}</p>
        {description}
      </Flex>
    </Flex>
  );
};

export default Card;
