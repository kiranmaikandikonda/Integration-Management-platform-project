import { redis } from "../config/redis.js";

export const getCache = async (key) => {
    try {
        if (!redis || redis.status !== "ready") {
            return null;
        }

        const data = await redis.get(key);

        return data ? JSON.parse(data) : null;

    } catch (error) {
        console.error("Redis get error:", error.message);
        return null;
    }
};

export const setCache = async (key, data, seconds = 300) => {
    try {
        if (!redis || redis.status !== "ready") {
            return false;
        }

        await redis.set(
            key,
            JSON.stringify(data),
            "EX",
            seconds
        );

        return true;

    } catch (error) {
        console.error("Redis set error:", error.message);
        return false;
    }
};

export const deleteCache = async (key) => {
    try {
        if (!redis || redis.status !== "ready") {
            return false;
        }

        await redis.del(key);
        return true;

    } catch (error) {
        console.error("Redis delete error:", error.message);
        return false;
    }
};
