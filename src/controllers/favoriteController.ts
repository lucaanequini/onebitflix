import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { favoriteService } from '../services/favoriteService'

export const favoriteController = {
    // GET /favorites
    view: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id

        try {
            const favorites = await favoriteService.findUserById(userId)
            return res.status(200).json(favorites)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    // POST /favorites
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body

        try {
            const favorite = await favoriteService.create(userId, Number(courseId))
            return res.status(201).json(favorite)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    // DELETE /favorites/:id
    remove: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body

        try {
            await favoriteService.remove(userId, Number(courseId))
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}