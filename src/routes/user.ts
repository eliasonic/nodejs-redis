import { Router } from "express";
import { client } from "../utils/redis";

const users = [
    { id: '1', username: 'Elias', password: 'sonic09' },
    { id: '2', username: 'Annie', password: 'marie5' },
    { id: '3', username: 'Lizzy', password: 'naakai7' },
]

export default function userRoutes() {
    const router = Router()

    router  
        .post('/login', async (req, res) => {
            const { username, password } = req.body
            let attempts = 0

            const stored = await client.get(`un-${username}`)

            if (stored) {
                attempts = Number(stored)
            }

            if (attempts > 4) {
                return res.status(401).json({ tooMany: true })
            }

            const user = users.find((user) => {
                return user.username === username && user.password === password
            })

            if (!user) {
                attempts++

                await client.setEx(`un-${username}`, 30, `${attempts}`)

                return res.status(401).json({ tooMany: false })
            }

            res.status(200).json({ success: true })
        })

    return router
}