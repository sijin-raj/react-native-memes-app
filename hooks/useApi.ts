import axios from 'axios'
import trending from '../assets/trending.json'
import { memesList } from '../assets/imageLit'

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
            }, 1000)
        })
    }

    // const getMemes = async (): Promise<Meme[]> => {
    //     return new Promise((resolve, reject) => {
    //         let result: Meme[] = [];
    //         Object.entries(meme).forEach(([key, value]) => {
    //             result.push({
    //                 name: key,
    //                 image: value
    //             })
    //         })
    //         resolve(result)
    //     })
    // }

    const getMemes = async (): Promise<Meme[]> => {
        return new Promise((resolve, reject) => {
            let result: Meme[] = [];

            Object.entries(memesList).forEach(([key, value]) => {
                result.push({
                    name: key,
                    image: value
                })
            })
            resolve(result)
        })
    }


    const createMeme = async (top: string, bottom: string, meme: string): Promise<any> => {
        return axios.get(`https://ronreiter-meme-generator.p.rapidapi.com/meme`, {
            params: { top, bottom, meme }, headers: {
                'X-RapidAPI-Key': 'b5f1d10d7amsh22036d987889f4ap19e097jsn05adc8a2cd5b',
                'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
            }, responseType: 'blob'
        })


        // return new Promise((resolve, reject) => {
        //   setTimeout(async () => {
        //     const response = await axios.get(`https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg`,
        //      {responseType: 'blob'})
        //     resolve(response)
        //   }, 2000);
        // });
    }

    return {
        getTrending,
        getMemes,
        createMeme
    }
}