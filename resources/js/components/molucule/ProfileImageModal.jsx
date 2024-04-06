import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Flex,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";

export const ProfileImageModal = props => {
    const {isOpen, onClose, image, crop, zoom, aspect, onCropChange, onZoomChange, onCropComplete, onClickImage} = props
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent p={8}>
                <Box mt={4} w="100%" h="500px" position={"relative"}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </Box>
                <Flex mt={4} justify={"space-between"}>
                    <Button onClick={onClose}>キャンセル</Button>
                    <Button onClick={onClickImage} bg="teal.400" color="white">切り取り</Button>
                </Flex>
            </ModalContent>
        </Modal>
    )
}