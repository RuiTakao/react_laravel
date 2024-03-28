import { Box } from "@chakra-ui/react";
import { Footer } from "../organisms/layouts/Footer";
import { Header } from "../organisms/layouts/Header";

export const Layout = props => {
    const { children } = props;
    return (
        <>
            <Header />
            <Box pt={16} pb={8} minH="calc(100vh - 48px)">
                {children}
            </Box>
            <Footer />
        </>
    )
}