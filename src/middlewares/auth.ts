import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) return res.status(401).json({ message: 'Unauthorized: No tokens were found' })

    const token = authorizationHeader.replace(/Bearer /, '')
    jwtService.verifyToken(token, (error, decoded) => {
        if (error || typeof decoded == 'undefined') return res.status(401).json({ message: 'Unauthorized: invalid token' })

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })
}