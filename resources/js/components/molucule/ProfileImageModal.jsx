import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Flex,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

export const ProfileImageModal = props => {

    const { isOpenProfileImageEdit, onCloseProfileImageEdit, base64Images, setViewImage, setCanvasData } = props

    const [crop, onCropChange] = useState({ x: 0, y: 0 });
    const [zoom, onZoomChange] = useState(1);
    // 切り抜き箇所
    const [croppedArea, setCroppedArea] = useState("");
    const onCropComplete = (croppedArea, croppedAreaPixels) => setCroppedArea(croppedAreaPixels);

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

    return (
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
    )
}