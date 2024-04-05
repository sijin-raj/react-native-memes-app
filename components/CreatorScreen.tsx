import { AspectRatio, Box, Center, Heading, HStack, Stack } from "native-base";
import { View, Text, Image } from "react-native"



const CreatorScreen = () => {
    return (
        <Box alignItems="center" marginTop={10}>
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        PHOTOS
                    </Center>
                </Box>
            </Box>
        </Box>

    )
}

export default CreatorScreen