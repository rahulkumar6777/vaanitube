import { createClient} from "redis"

export const client = createClient()

client.on('error' , err => console.log("redis connection Error" , err));

export const connectRedis = async () => {
    await client.connect();
}