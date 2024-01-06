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
import Failed from "../../public/assets/failed.png";
import Image from "next/image";
const FailedToCreateLottery = () => {
const { isOpen, onOpen, onClose } = useDisclosure()

return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent display="flex" alignItems="center" justifyContent="center">
                <ModalHeader pb={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Flex>
                        <Image src={Failed} alt="logo" className="w-[9rem]" />
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Heading as="h5" size="xl" textAlign="center">
                        Lottery failed to be created!
                    </Heading>
                </ModalBody>

                <ModalFooter pb={6} display="flex" alignItems="center" justifyContent="center">
                <Button className='!bg-danger'  color="white" mr={15} onClick={onClose}>
                    TRY AGAIN
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

export default FailedToCreateLottery;