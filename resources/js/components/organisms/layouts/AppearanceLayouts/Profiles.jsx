import {
    Box,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Input,
    Textarea,
    useDisclosure,
    Flex,
    Img,
    Icon
} from "@chakra-ui/react";
import { TbCameraPlus } from "react-icons/tb";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";

export const Profiles = () => {

    // DBからデータ取得
    useEffect(() => {
        axios.get('/dev/react_laravel/public/api/profile').then(res => {
            setName(res.data.name)
            setWork(res.data.work)
            setProfileText(res.data.profile_text)
            setViewImage(`/dev/react_laravel/public/storage/img/${res.data.saveImage}`)
        });
    }, []);

    // テキスト入力項目取得処理
    const [name, setName] = useState("");
    const [work, setWork] = useState("");
    const [profileText, setProfileText] = useState("");
    const onChangeInputName = e => setName(e.target.value);
    const onChangeInputWork = e => setWork(e.target.value);
    const onChangeInputprofileText = e => setProfileText(e.target.value);

    // DBデータ更新処理
    const onClickUpdateProfile = () => {
        const base64 = canvasData.toDataURL('image/png')
        const bin = atob(base64.split(",")[1])
        const buffer = new Uint8Array(bin.length)
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        // Blobを作成
        var blob = new Blob([buffer.buffer], {
            type: 'image/png'
        });

        const data = new FormData();
        data.append('name', name)
        data.append('work', work)
        data.append('profile_text', profileText)
        data.append('saveImage', blob, 'image.png')

        axios.post('/dev/react_laravel/public/api/profile', data, {
            'enctype': 'multipart/form-data'
        }).then(res => console.log(res))
        onCloseProfileEdit()
    }

    // 編集モーダル動作
    const {
        isOpen: isOpenProfileEdit,
        onOpen: onOpenProfileEdit,
        onClose: onCloseProfileEdit
    } = useDisclosure();

    // プロフィール画像編集モーダル動作
    const {
        isOpen: isOpenProfileImageEdit,
        onOpen: onOpenProfileImageEdit,
        onClose: onCloseProfileImageEdit
    } = useDisclosure();

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

    return (
        <Box maxW={768} m="auto" mt={4} p={4} bg="gray.200" borderRadius={16} position="relative">
            <Img src={viewImage} w={192} h={192} />
            <Text fontSize="3xl" fontWeight="bold" mt={8}>{name}</Text>
            <Text fontSize="xl" fontWeight="bold" mt={2}>{work}</Text>
            <Text fontSize="xl" mt={8} whiteSpace={"pre-wrap"}>{profileText}</Text>
            <Button onClick={onOpenProfileEdit} bg="teal.400" position="absolute" top={4} right={4} color="white">プロフィール編集</Button>
            {/* モーダル */}
            <Modal isOpen={isOpenProfileEdit} onClose={onCloseProfileEdit} size="3xl">
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
                        <Button onClick={onCloseProfileEdit}>キャンセル</Button>
                        <Button onClick={onClickUpdateProfile} bg="teal.400" color="white">変更を保存</Button>
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
        </Box>
    )
}