import axios from 'axios'
import trending from '../assets/trending.json'

export interface TrendingMeme {
    title: string
    url: string
    created_utc: number
}

export interface Meme {
    name: string
    image: any
}


export const useApi = () => {


    const getTrending = async (): Promise<TrendingMeme[]> => {

        // const result = await axios.get('https://reddit-meme.p.rapidapi.com/memes/trending',
        //     {
        //         headers: {
        //             'X-RapidAPI-Key': 'b5f1d10d7amsh22036d987889f4ap19e097jsn05adc8a2cd5b',
        //             'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
        //         }
        //     })
        // // console.log("result", result.data)
        // return result.data;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(trending)
            }, 2000)
        })
    }

    return {
        getTrending
    }
}