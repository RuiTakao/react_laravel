import { Button, Flex, Heading, Link } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const layoutsLink = () => navigate('/admin/layouts');
    const itemListsLink = () => navigate('/admin/item_lists');

    return (
        <Flex px={8} bg="gray.50" justify="space-between" align="center" h={16} position="fixed" w="100%" shadow="md">
            <Flex gap={16} align="center">
                <Heading fontSize="2xl">Smart Profile</Heading>
                <Flex as="nav" gap={8} align="center">
                    <Link onClick={layoutsLink}>外観レイアウト</Link>
                    <Link onClick={itemListsLink}>項目一覧</Link>
                    <Link>サイト設定</Link>
                </Flex>
            </Flex>
            <Button>ログアウト</Button>
        </Flex>
    );
}