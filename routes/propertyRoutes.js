import express from 'express';
import propertyModel from '../models/propertyModel.js';
import fs from 'fs';
import mongoose from 'mongoose';

const router = express.Router();

const createPropertyController = async (req, res) => {
    try {
        const { title, location, price, description, photoLink } = req.body;

        if (!title || !description || !price || !location) {
            return res.status(400).send({ error: "Title, Description, Price, and Location are required fields" });
        }

        const newProperty = new propertyModel({ title, location, price, description, photoLink });

        const property = await newProperty.save(); // Wait for the property to be saved to the database

        res.status(201).send({
            success: true,
            message: "Property Created Successfully",
            property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in creating Property",
        });
    }
};
const getProperties = async (req, res) => {
    try {
        const properties = await propertyModel.find();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};
router.get('/', getProperties);
export { getProperties };
router.post('/create-property', createPropertyController);

export default router;
