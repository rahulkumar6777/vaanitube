import { createClient } from "redis"

const client = createClient();

const connectRedis = async () => {
    await client.connect()
}

export { client, connectRedis }