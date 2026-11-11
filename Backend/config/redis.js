import Redis from "ioredis";

let redis = null;

const connectRedis = async () => {
    if (!process.env.REDIS_URL) {
        console.log("Redis not configured. Cache disabled.");
        return;
    }

    try {
        redis = new Redis(process.env.REDIS_URL, {
            lazyConnect: true,
            maxRetriesPerRequest: 1
        });

        await redis.connect();

        console.log("Redis Connected Successfully");
    } catch (error) {
        console.log("Redis unavailable. Continuing without cache.");
        redis = null;
    }
};

export { redis, connectRedis };