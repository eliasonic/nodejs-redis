import express from "express"
import api from "./routes/api"
import { resolve } from 'path'

export default function configure() {
    const app = express()
    app
        .get('/', (req, res) => {
            res.sendFile(resolve(__dirname, '../index.html'))
        })

        .use(express.json())
        .use(express.urlencoded({ extended: false }))

        .use(express.static('public'))

        .use('/healthcheck', (req, res) => {
            res.sendStatus(200)
        })

        .use('/api/v1', api())

    return app
} 

