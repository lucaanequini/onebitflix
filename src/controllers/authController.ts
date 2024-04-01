import { Request, Response } from "express"
import { userService } from "../services/userService"

export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, phone, email, birth, password } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists) {
                throw new Error('This email is already in use')
            }

            const user = await userService.create({
                firstName,
                lastName,
                birth,
                phone,
                password,
                email,
                role: "user"
            })

            return res.status(201).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}