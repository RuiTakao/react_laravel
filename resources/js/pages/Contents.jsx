import { Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

export const Contents = () => {
    const {id} = useParams();
    return (
        <Text>あ {id}</Text>
    )
}