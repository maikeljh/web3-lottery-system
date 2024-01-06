import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Heading,
    Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import Success from "../../public/assets/success.png";
import Image from "next/image";
const SuccessfullJoinLottery = () => {
const { isOpen, onOpen, onClose } = useDisclosure()
const [userName, setUserName] = useState("Wynn");// Ini buat nama nanti
return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pb={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Flex>
                        <Image src={Success} alt="logo" className="w-[9rem]" />
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Heading as="h5" size="xl" textAlign="center">
                        Lottery <span className="!text-primary-1-400">{userName}</span> successfully joined!
                    </Heading>
                </ModalBody>

                <ModalFooter pb={6} display="flex" alignItems="center" justifyContent="center">
                <Button className='!bg-primary-1-400'  color="white" mr={15} onClick={onClose}>
                    DONE
                </Button>
                <Button className='!text-primary-3-500 !bg-white !outline-primary-3-500'ml={15} onClick={onClose}>
                    MY LOTTERIES
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
)
}

export default SuccessfullJoinLottery;