import { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { TrendingMeme, useApi } from "../hooks/useApi"
import { Box, Heading, HStack, Spinner } from "native-base"



const HomeScreen = () => {

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
    }
    )


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
                    {
                        memes?.map((meme, index) => {
                            return (
                                <Box key={index}>
                                    <Text>{meme.title}</Text>
                                    <Image

                                        source={{ uri: meme.url }}
                                        style={{ width: '95%', height: 300 }}></Image>
                                </Box>

                            )
                        })
                    }

                </>
            )}



        </View>
    )
}

export default HomeScreen