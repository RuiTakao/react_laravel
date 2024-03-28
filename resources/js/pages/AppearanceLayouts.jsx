import {
    Box,
    Grid,
    GridItem
} from "@chakra-ui/react"
import { Sidebar } from "../components/organisms/layouts/Sidebar"
import { Profiles } from "../components/organisms/layouts/AppearanceLayouts/Profiles";

export const AppearanceLayouts = () => {

    return (
        <Grid gridTemplateColumns={'1fr 200px'}>
            <GridItem>
                <Box w="100%" h={400} bg="gray"></Box>
                <Profiles />
            </GridItem>
            <GridItem>
                <Sidebar />
            </GridItem>
        </Grid>
    )
}