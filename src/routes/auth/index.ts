import { Router } from "express";
import { createUserSchema, loginSchema, userTable } from "../../db/usersSchema";
import { validateData } from "../../middleware/validationMiddleware";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody
        data.password = await bcrypt.hash(data.password, 10)
        const [user] = await db.insert(userTable).values(data).returning({
            id: userTable.id,
            email: userTable.email,
            name: userTable.name
        })
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const {email, password} = req.cleanBody
        const [user] = await db.select().from(userTable).where(eq(userTable.email, email))
        if (!user) {
            res.status(401).send("Authentication failed")
            return
        }
        const passwordMatched =  await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            res.status(401).send("Authentication failed")
            return
        }

        // create a jwt token
        const token = jwt.sign({userId: user.id, role: user.role}, 'your-secret', {expiresIn: '30d'})
        const {password: _, ...userData} = user

        res.status(200).json({user: userData, token})

    } catch (error) {
        res.status(500).send(error)
    }
})

export default router