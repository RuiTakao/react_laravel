import { Box, Button, ListItem, Text, UnorderedList } from "@chakra-ui/react"

export const Sidebar = () => {
    return (
        <Box bg="gray.50" h="100%" w="200px" position={"fixed"} top={16} right={0}>
            <UnorderedList p={0} m={0}>
                <ListItem pt={8} pl={4} pb={4} listStyleType="none" borderBottom="1px solid #ccc">
                    <Text fontSize="xl" fontWeight="bold">レイアウト</Text>
                    <Button bg="teal.400">編集</Button>
                </ListItem>
                <ListItem pt={8} pl={4} pb={4} listStyleType="none" borderBottom="1px solid #ccc">
                    <Text fontSize="xl" fontWeight="bold">背景色</Text>
                    <Button bg="teal.400">編集</Button>
                </ListItem>
            </UnorderedList>
        </Box>
    )
}