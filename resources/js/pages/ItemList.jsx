import { Box, Button, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const ItemList = () => {
    const navigate = useNavigate();

    const contentsLink = () => {
        navigate(`/admin/item_lists/contents/1`);
    }

    return (
        <Box maxW={768} m={"auto"} mt={8}>
            <Text fontSize="xl" fontWeight="bold" borderBottom="1px solid #ccc">項目一覧</Text>
            <Button colorScheme='blue' px={12} h={8} mt={4}>追加</Button>
            <UnorderedList m={0} p={0} listStyleType={"none"}>
                <ListItem bg='gray.200' w="100%" p={2} mt={8}>
                    <Flex justify="space-between" align="center">
                        <Text fontSize="xl" fontWeight="bold" m={0}>経歴</Text>
                        <Button onClick={contentsLink} colorScheme='teal' px={4} py={0} fontSize="md" h={8}>編集</Button>
                    </Flex>
                </ListItem>
                <ListItem bg='gray.200' w="100%" p={2} mt={4}>
                    <Flex justify="space-between" align="center">
                        <Text fontSize="xl" fontWeight="bold" m={0}>実績</Text>
                        <Button onClick={contentsLink} colorScheme='teal' px={4} py={0} fontSize="md" h={8}>編集</Button>
                    </Flex>
                </ListItem>
            </UnorderedList>
        </Box>
    )
}