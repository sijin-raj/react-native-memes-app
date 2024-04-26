import { Heading, Pressable,Image, Row, Center } from 'native-base'
import { useEffect, useState } from 'react'
import { Meme, useApi } from '../hooks/useApi'
import {  Text,} from 'react-native'
import { memesList } from '../assets/imageLit'

interface MemeProps {
    activeMeme?: string
    onSelect: (meme: Meme) => void
}

const MemeSelector: React.FC<MemeProps> = (props) => {
    // const { getMemes } = useApi()
    const [memes, setMemes] = useState<Meme[] | null>(null)

    useEffect(() => {
        const loadMemes = () => {
            // getMemes().then((results) => {
            //     setMemes(results)
            // })
            setMemes(memesList)
        }
        loadMemes()
    }, [])

    const memeSelected = (meme: Meme) => {
        props.onSelect(meme)
    }


    return (
        <>
            <Center>
                <Heading color='black' >Select your Meme:</Heading>
            </Center>
            <Row
                flexWrap={'wrap'}
                mb={5}
                mt={5}
                alignItems={'center'}
                justifyContent={'center'}
            >
                {memesList?.map((meme, index) => {
                    return (
                        <Pressable
                            key={index}
                            m={1}
                            onPress={() => memeSelected(meme)}
                            shadow="2"
                        >
                          {/* <Text style={{color:'black'}} >{meme.name}</Text>   */}
                            <Image
                                alt="Meme"
                                source={{uri: meme.image}}
                                size={'lg'}
                                borderRadius={20}
                                borderColor={'pink.500'}
                                // style={{ width: '100%', height: 180, borderRadius: 20 }}
                                borderWidth={props.activeMeme === meme.name ? 4 : 0}
                            />
                        </Pressable>
                    )
                })}
            </Row>
        </>
    )
}

export default MemeSelector