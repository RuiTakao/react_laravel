import {
    Box,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Input,
    Textarea,
    Flex,
    Img,
    Icon,
    useDisclosure
} from "@chakra-ui/react";
import { TbCameraPlus } from "react-icons/tb";
import { ProfileImageModal } from "./ProfileImageModal"
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const ProfileModal = memo(props => {

    const { isOpen, onClose, data } = props;

    if (isOpen) {

        // プロフィール画像編集モーダル動作
        const {
            isOpen: isOpenProfileImageEdit,
            onOpen: onOpenProfileImageEdit,
            onClose: onCloseProfileImageEdit
        } = useDisclosure();

        const onInputImage = e => {
            const file = e.target.files;
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result
                setBase64Images(result)
            }
            reader.readAsDataURL(file[0])
            onOpenProfileImageEdit()
        }

        // 画像クロップ
        // アップロードした画像
        const [base64Images, setBase64Images] = useState("")
        // 表示用
        const [viewImage, setViewImage] = useState(`/dev/react_laravel/public/storage/img/image.png`)
        // サーバーに送る画像の情報
        const [canvasData, setCanvasData] = useState("")
        
        // テキスト入力項目取得処理
        const [name, setName] = useState(data.name);
        const [work, setWork] = useState(data.work);
        const [profileText, setProfileText] = useState(data.profile_text);

        const onChangeInputName = e => setName(e.target.value);
        const onChangeInputWork = e => setWork(e.target.value);
        const onChangeInputprofileText = e => setProfileText(e.target.value);

        return (
            <>
                <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                    <ModalOverlay />
                    <ModalContent p={8}>
                        <Text fontSize="xl" fontWeight="bold" borderBottom="1px solid #ccc">プロフィール編集</Text>

                        <Box w={152} h={152} position={"relative"}>
                            <Img src={viewImage} w="100%" h="100%" />
                            <Box position={"absolute"} w="100%" h="100%" bg={"gray"} opacity={.5} zIndex={3} top={0} left={0}>
                                <Icon as={TbCameraPlus} w={16} h={16} marginX={"auto"} position={"absolute"} top="50%" left="50%" transform="translate(-50%, -50%)" color="white" />
                            </Box>
                            <Input type="file" accept="image/jpeg, image/png" id="profile_image" position={"absolute"} w="100%" h="100%" zIndex={5} top={0} left={0} opacity={0} onChange={onInputImage} cursor={"pointer"} />
                        </Box>

                        <Text fontWeight="bold" mt={6} mb={1}>名前</Text>
                        <Input defaultValue={name} onChange={onChangeInputName} />

                        <Text fontWeight="bold" mt={4} mb={1}>仕事名</Text>
                        <Input value={work} onChange={onChangeInputWork} />

                        <Text fontWeight="bold" mt={4} mb={1}>プロフィール文</Text>
                        <Textarea value={profileText} onChange={onChangeInputprofileText} h={40} />

                        <Flex mt={8} justify={"space-between"} align={"center"}>
                            <Button onClick={onClose}>キャンセル</Button>
                            {/* <Button onClick={onClickUpdateProfile} bg="teal.400" color="white">変更を保存</Button> */}
                        </Flex>
                    </ModalContent>
                </Modal>
                <ProfileImageModal isOpenProfileImageEdit={isOpenProfileImageEdit} onCloseProfileImageEdit={onCloseProfileImageEdit} base64Images={base64Images} setViewImage={setViewImage} setCanvasData={setCanvasData} />
            </>
        )
    }
})