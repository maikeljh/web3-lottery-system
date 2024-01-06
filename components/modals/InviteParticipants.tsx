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
    Text,
    Link
} from '@chakra-ui/react'
import React, { useState } from 'react';
import Success from "../../public/assets/success.png";
import Image from "next/image";
import Attach from "../../public/assets/attach.png";
const InviteParticipants = () => {
const { isOpen, onOpen, onClose } = useDisclosure()
const [userName, setUserName] = useState("AnitaMaxWynn");// Ini buat nama nanti
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
                        Lottery <span className="!text-primary-1-400">{userName}</span> has been created!
                    </Heading>
                </ModalBody>

                <ModalFooter pb={6} display="flex" flexDirection="column"alignItems="center" justifyContent="center">
                <Flex>
                    <Image src={Attach} alt="logo" className="w-[1.125rem]" />
                    <Link className="!text-primary-1-500"color='teal.500' fontSize={18} mr={5}href='#' >
                        Invite members
                    </Link>
                </Flex>
                <Button className='!bg-primary-1-400'  color="white" mt={15} onClick={onClose}>
                    DONE
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
)
}

export default InviteParticipants;