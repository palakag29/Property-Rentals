import express from 'express';
import userModel from '../models/userModel.js';
import { comparePassword ,hashPassword } from './authHelper.js';
import JWT  from 'jsonwebtoken';
const router = express.Router();

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).send({ error: "Name, email, password, and phone are required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already registered. Please login.",
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
               
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
