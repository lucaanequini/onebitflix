import { Like } from "../models"

export const likeService = {
    create: async (userId: number, courseId: number) => {
        const like = await Like.create({
            userId,
            courseId
        })
        return like
    },
    remove: async (userId: number, courseId: number) => {
        const like = await Like.destroy({
            where: { userId, courseId }
        })
        return like
    }
}