import dotenv from "dotenv";
import express, {
    NextFunction,
    Request,
    Response
} from "express";
import jwt from "jsonwebtoken";

import credentials from "../services/credential-svc";
import friends from "../services/friend-svc"
import Friends from "../services/friend-svc";
import {Friend} from "../models";

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string =
    process.env.TOKEN_SECRET || "NOT_A_SECRET";

function generateAccessToken(
    username: string
): Promise<String> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else {
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (decoded) next();
            else res.status(403).end();
        });
    }
}

router.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body; // from form

    if (!username || !password) {
        res.status(400).send("Bad request: Invalid input data.");
    } else {
        try {
            const creds = await credentials.create(username, password);

            // Create a friend entry
            const friend = await Friends.createFromUsername(username);

            // Generate an access token
            const token = await generateAccessToken(username);

            // Send a single response
            res.status(201).send({
                friend,
                token,
            });
        } catch (err) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
});

router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body; // from form

    if (!username || !password) {
        res.status(400).send("Bad request: Invalid input data.");
    } else {
        credentials
            .verify(username, password)
            .then((goodUser: string) => generateAccessToken(goodUser))
            .then((token) => res.status(200).send({ token: token }))
            .catch((error) => res.status(401).send("Unauthorized"));
    }
});

export default router;