import http from 'http'
import configure from './src/app'
import { connectRedis } from './src/utils/redis'

const app = configure()
const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, async () => {
    console.log(`Server is started on port ${port}`)

    try {
        await connectRedis()
        console.log('Redis connected!')
    } catch (e) {
        console.log('Error connecting to Redis')
    }
})

