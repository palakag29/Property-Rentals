import express from 'express';
import propertyModel from '../models/propertyModel.js';
import ExpressFormidable from 'express-formidable';
import fs from 'fs';
import mongoose from 'mongoose';

const router = express.Router();

const createPropertyController = async (req, res) => {
    try {
        const { name, location, price, description, imageUrl } = req.fields;

        if (!name || !description || !price || !location) {
            return res.status(500).send({ error: "Name, Description, Price, and Location are required fields" });
        }

        const property = new propertyModel({ ...req.fields });

        if (imageUrl) {
            property.images.url = imageUrl;
        }

        await property.save();

        res.status(201).send({
            success: true,
            message: "Property Created Successfully",
            property,
        });
    } catch (error) {
    
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Property",
        });
    }
};

router.post('/create-property', ExpressFormidable(), createPropertyController);

export default router;
