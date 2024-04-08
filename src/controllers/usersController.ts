import { AuthenticatedRequest } from "../middlewares/auth";
import { Response } from "express";
import { userService } from "../services/userService";

export const usersController = {
    // GET /users/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!

        try {
            const watching = await userService.getKeepWatchingList(id)
            return res.json(watching)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    //GET /users/current
    show: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user!

        try {
            return res.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}