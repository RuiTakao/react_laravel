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

    // // DBデータ更新処理
    // const onClickUpdateProfile = () => {
    //     const base64 = canvasData.toDataURL('image/png')
    //     const bin = atob(base64.split(",")[1])
    //     const buffer = new Uint8Array(bin.length)
    //     for (var i = 0; i < bin.length; i++) {
    //         buffer[i] = bin.charCodeAt(i);
    //     }
    //     // Blobを作成
    //     var blob = new Blob([buffer.buffer], {
    //         type: 'image/png'
    //     });

    //     const data = new FormData();
    //     data.append('name', name)
    //     data.append('work', work)
    //     data.append('profile_text', profileText)
    //     data.append('saveImage', blob, 'image.png')

    //     axios.post('/dev/react_laravel/public/api/profile', data, {
    //         'enctype': 'multipart/form-data'
    //     }).then(res => console.log(res))
    //     onCloseProfileEdit()
    // }

    // 編集モーダル動作
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [profiles, setProfiles] = useState([])

    const getProfile = async () => {
        const { data } = await axios.get('/dev/react_laravel/public/api/profile')
        setProfiles(data)
    }

    useEffect(() => getProfile(), [])

    return (
        <Box maxW={768} m="auto" mt={4} p={4} bg="gray.200" borderRadius={16} position="relative">
            <Img src={`/dev/react_laravel/public/storage/img/${profiles.saveImage}`} w={192} h={192} />
            <Text fontSize="3xl" fontWeight="bold" mt={8}>{profiles.name}</Text>
            <Text fontSize="xl" fontWeight="bold" mt={2}>{profiles.work}</Text>
            <Text fontSize="xl" mt={8} whiteSpace={"pre-wrap"}>{profiles.profile_text}</Text>
            <Button onClick={onOpen} bg="teal.400" position="absolute" top={4} right={4} color="white">プロフィール編集</Button>
            {/* モーダル */}
            <ProfileModal isOpen={isOpen} onClose={onClose} data={profiles} />
        </Box>
    )
}