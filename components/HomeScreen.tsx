import { useEffect, useState } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import { Meme, TrendingMeme, useApi } from "../hooks/useApi"
import { Box, Heading, HStack, Spinner, useTheme } from "native-base"
import MemeSelector from "./MemeSelector"


import { NavigationProp } from '@react-navigation/native'
interface RouterProps {
    navigation: NavigationProp<any, any>
}

const HomeScreen = ({ navigation }: RouterProps) => {

    const theme = useTheme()
    const { getTrending } = useApi()
    const [memes, setMemes] = useState<TrendingMeme[] | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const loadMemes = async () => {
            const results = await getTrending()
            setMemes(results)
            setLoading(false)
        }
        loadMemes()
    }, [])

    const memeSelected = (meme: Meme) => {
        navigation.navigate('Creator', { meme: meme.name })
    }

    const Loader = () => {
        return <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.100" fontSize="md">
                Loading
            </Heading>
        </HStack>;
    };

    return (
        <View>
            {
                loading && (
                    <Loader />
                )
            }

            {!loading && (
                <>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}>
                        {
                            memes?.map((meme, index) => {
                                return (
                                    <Box key={index} p={4} backgroundColor='pink.100' >

                                        <Image

                                            source={{ uri: meme.url }}
                                            style={{ width: '100%', height: 150, borderRadius: 20, }}></Image>

                                        <Text style={{fontSize: 16 , paddingTop: 16}} >{meme.title}</Text>
                                    </Box>

                                )
                            })
                        }
                    </ScrollView>
                </>
            )}

            <MemeSelector onSelect={(meme) => memeSelected(meme)} />

        </View>
    )
}

export default HomeScreen