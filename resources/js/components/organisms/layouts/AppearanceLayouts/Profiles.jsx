import {
    Box,
    Text,
    Button,
    useDisclosure,
    Img,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileModal } from "../../../molucule/ProfileModal";

export const Profiles = () => {

    // 編集モーダル動作
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [profiles, setProfiles] = useState([])
    const [image, setimage] = useState("")

    const getProfile = async () => {
        const { data } = await axios.get('/dev/react_laravel/public/api/profile')
        setProfiles(data)
        setimage(`/dev/react_laravel/public/storage/img/${data.saveImage}`)
    }

    useEffect(() => getProfile(), [])

    return (
        <Box maxW={768} m="auto" mt={4} p={4} bg="gray.200" borderRadius={16} position="relative">
            <Img src={image} w={192} h={192} />
            <Text fontSize="3xl" fontWeight="bold" mt={8}>{profiles.name}</Text>
            <Text fontSize="xl" fontWeight="bold" mt={2}>{profiles.work}</Text>
            <Text fontSize="xl" mt={8} whiteSpace={"pre-wrap"}>{profiles.profile_text}</Text>
            <Button onClick={onOpen} bg="teal.400" position="absolute" top={4} right={4} color="white">プロフィール編集</Button>
            {/* モーダル */}
            <ProfileModal isOpen={isOpen} onClose={onClose} data={profiles} getProfile={getProfile} image={image} />
        </Box>
    )
}