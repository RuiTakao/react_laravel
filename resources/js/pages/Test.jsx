import { Box, Button, Image as ViewImage, Input } from "@chakra-ui/react"
import axios from "axios"
import { reject } from "lodash"
import { useCallback, useState } from "react"
import Cropper from "react-easy-crop"

export const Test = () => {
    const [base64Images, setBase64Images] = useState("")
    const [viewImage, setViewImage] = useState("")
    const [croppedArea, setCroppedArea] = useState("")
    const [canvasData, setCanvasData] = useState("")

    const onInputImage = e => {
        const file = e.target.files;

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result

            setBase64Images(result)
        }
        reader.readAsDataURL(file[0])
    }


    const [crop, onCropChange] = useState({ x: 0, y: 0 })
    const [zoom, onZoomChange] = useState(1)
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels)
        setCroppedArea(croppedAreaPixels)
    }

    //test
    const onClickImage = useCallback(async () => {
        const croppedImage = await getCroppedImg(base64Images, croppedArea)
        setViewImage(croppedImage)
    })

    const createImage = url =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        })


    async function getCroppedImg(
        imageSrc,
        pixelCrop
    ) {
        const image = await createImage(imageSrc);
        // console.log(imageSrc)
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

    const save = () => {

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
        data.append('saveImage',blob,'image.png')

        axios.post('/dev/react_laravel/public/api/testImage',data, {
            'enctype': 'multipart/form-data'
        }).then(res => console.log(res))
    }

    //test

    return (
        <Box mt={8}>
            <ViewImage src={viewImage} w="192px" h="192px" />
            <Input type="file" accept="image/jpeg, image/png" onChange={onInputImage} />
            <Box mt={4} w="192px" h="192px" position={"relative"}>
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
            <Button onClick={onClickImage}>画像加工</Button>
            <Button onClick={save}>保存</Button>
        </Box>
    )
}