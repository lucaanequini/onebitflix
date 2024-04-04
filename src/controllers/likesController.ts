import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { Response } from 'express'

export const likesController = {
    //POST /likes
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body

        try {
            const like = await likeService.create(userId, courseId)
            return res.status(200).json(like)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    // DELETE /likes/:id
    remove: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body

        try {
            await likeService.remove(userId, Number(courseId))
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}