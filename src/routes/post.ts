import { Router } from "express";
import { client } from "../utils/redis";
import axios from 'axios'

export default function postRoutes() {
    const router = Router()

    router
        .post('/', async (req, res) => {
            const { key, value } =  req.body

            const response = await client.set(key, value)
            res.status(200).json(response)
        })

        .get('/', async (req, res) => {
            const { key } = req.body
            
            const value = await client.get(key)
            res.status(200).json(value)
        })

        .get('/:id', async (req, res) => {
            const { id } = req.params

            const cachedPost = await client.get(`post-${id}`)

            if (cachedPost) {
                return res.status(200).json(JSON.parse(cachedPost))
            }

            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

            await client.setEx(`post-${id}`, 20, JSON.stringify(response.data))
            // await client.set(`post-${id}`, JSON.stringify(response.data), { EX: 20 })

            return res.status(200).json(response.data)
        }) 

    return router
}