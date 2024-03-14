import express from 'express';
import userModel from '../models/userModel.js';

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
                success: true,
                message: "User already registered. Please login.",
            });
        }

        const user = await new userModel({
            name,
            email,
            password,
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

router.post("/register", registerController);

export default router;
