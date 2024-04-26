import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AspectRatio, Box, Center, Heading, HStack, Stack, Image, VStack, FormControl, Input, Button, Spinner, Modal } from "native-base";
import { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { memesList } from '../assets/imageLit'
import MemeSelector from "./MemeSelector";
import { Meme, useApi } from "../hooks/useApi";

interface RouterProps {

    navigation: NavigationProp<any, any>
    route: RouteProp<{ params: { meme: string } }, 'params'>
}

const CreatorScreen = ({ route }: RouterProps) => {

    const { createMeme } = useApi()


    const [selected, setSelected] = useState<any>()
    const [selectedName, setSelectedName] = useState<string>()

    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>()
    const [showModal, setShowModal] = useState(false)



    useEffect(() => {
        const { meme } = route.params || { meme: 'meme-2' }
        setSelected(memesList[meme])
        setSelectedName(meme)
    }, [route])

    const memeSelected = (meme: Meme) => {
        setSelected(meme.image)
        setSelectedName(meme.name)
    }

    console.log("meme name", selectedName)
    console.log("meme", selected)

    const doCreateMeme = async () => {
        setLoading(true)

        const memeBlob = await createMeme(top, bottom, selectedName!)
        setLoading(false)

        const fileReaderInstance = new FileReader()
        fileReaderInstance.readAsDataURL(memeBlob.data)
        fileReaderInstance.onload = () => {
            console.log('ONLOAD')

            const base64data = fileReaderInstance.result
            setResult(base64data)
            setShowModal(true)
        }
    }


    const startDownload = () => { }


    const Loader = () => {
        return <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.100" fontSize="md">
                Creating meme...
            </Heading>
        </HStack>;
    };

    return (
        <>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth={400}>
                    <Modal.CloseButton />
                    <Modal.Header>Your Meme</Modal.Header>
                    <Modal.Body>
                        <Image
                            source={{ uri: result }}
                            alt="Result"
                            resizeMode="contain"
                            width={'400'}
                            height={'200'}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button flex={1} onPress={() => startDownload()}>
                            Download
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {
                loading && (
                    <Loader />
                )
            }
            {!loading && (

                <>
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
                                <AspectRatio w="100%" >
                                    <Image key={selected} source={{ uri: selected }} alt="image" />
                                </AspectRatio>

                            </Box>
                        </Box>
                    </Box>
                    <Box alignItems="center" marginTop={5}>
                        <VStack space={2} w={'60%'}>
                            <FormControl>
                                <Input
                                    placeholder="Top text"
                                    onChangeText={(text) => setTop(text)}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder="Bottom text"
                                    onChangeText={(text) => setBottom(text)}
                                />
                            </FormControl>
                            <Button
                                colorScheme={'secondary'}
                                onPress={() => doCreateMeme()}
                                size="md"
                            >
                                Create Meme
                            </Button>
                        </VStack>
                    </Box>
                </>
            )}
            <MemeSelector onSelect={(meme) => memeSelected(meme)} activeMeme={selectedName} />
        </>


    )
}

export default CreatorScreen