import { Router } from "express";
import userRoutes from "./user";
import postRoutes from "./post";

export default function api() {
    const router = Router()

    router
        .use('/users', userRoutes())

        .use('/posts', postRoutes())

    return router
}