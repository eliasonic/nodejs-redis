import { createClient } from 'redis'
require('dotenv').config()

export const client = createClient({
    url: process.env.REDIS_URL
})

client.on('error', (e) => {
    console.log('Redis Error', e)
})

export function connectRedis() {
    return client.connect()
}