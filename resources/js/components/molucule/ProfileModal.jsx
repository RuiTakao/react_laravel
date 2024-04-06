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
import Cropper from "react-easy-crop";
import { getProfile } from "../hooks/ProfileData";
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

        // 画像切り抜き
        const onClickImage = useCallback(async () => {
            const croppedImage = await getCroppedImg(base64Images, croppedArea)
            setViewImage(croppedImage)
            onCloseProfileImageEdit()
        })

        const createImage = url =>
            new Promise((resolve, reject) => {
                const image = new Image()
                image.addEventListener("load", () => resolve(image));
                image.addEventListener("error", (error) => reject(error));
                image.setAttribute("crossOrigin", "anonymous");
                image.src = url;
            })

        async function getCroppedImg(imageSrc, pixelCrop) {
            const image = await createImage(imageSrc);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                return "";
            }

            // canvasサイズを設定
            canvas.width = image.width;
            canvas.height = image.height;

            // canvas上に画像を描画
            ctx.drawImage(image, 0, 0);

            // トリミング後の画像を抽出
            const data = ctx.getImageData(
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height
            );

            // canvasのサイズ指定(切り取り後の画像サイズに更新)
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            // 抽出した画像データをcanvasの左隅に貼り付け
            ctx.putImageData(data, 0, 0);

            setCanvasData(canvas)

            // canvasを画像に変換
            return new Promise((resolve, reject) => {
                canvas.toBlob((file) => {
                    if (file !== null) resolve(URL.createObjectURL(file));
                }, "image/jpeg");
            });
        }

        // 画像クロップ
        // アップロードした画像
        const [base64Images, setBase64Images] = useState("")
        // 表示用
        const [viewImage, setViewImage] = useState(`/dev/react_laravel/public/storage/img/image.png`)
        // 切り抜き箇所
        const [croppedArea, setCroppedArea] = useState("")
        // サーバーに送る画像の情報
        const [canvasData, setCanvasData] = useState("")

        const [crop, onCropChange] = useState({ x: 0, y: 0 })
        const [zoom, onZoomChange] = useState(1)
        const onCropComplete = (croppedArea, croppedAreaPixels) => setCroppedArea(croppedAreaPixels);



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
                <Modal isOpen={isOpenProfileImageEdit} onClose={onCloseProfileImageEdit} size="4xl">
                    <ModalOverlay />
                    <ModalContent p={8}>
                        <Box mt={4} w="100%" h="500px" position={"relative"}>
                            <Cropper
                                image={base64Images}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={onCropChange}
                                onZoomChange={onZoomChange}
                                onCropComplete={onCropComplete}
                            />
                        </Box>
                        <Flex mt={4} justify={"space-between"}>
                            <Button onClick={onCloseProfileImageEdit}>キャンセル</Button>
                            <Button onClick={onClickImage} bg="teal.400" color="white">切り取り</Button>
                        </Flex>
                    </ModalContent>
                </Modal>
            </>
        )
    }
})