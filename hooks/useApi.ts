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
            console.log(value)

            result.push({
              name:key,
              image: value
            })
          })
          resolve(result)
        })
      }

    return {
        getTrending,
        getMemes
    }
}