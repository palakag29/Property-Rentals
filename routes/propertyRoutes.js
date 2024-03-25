import express from 'express';
import propertyModel from '../models/propertyModel.js';
import fs from 'fs';
import mongoose from 'mongoose';
import formidable from 'express-formidable';


export const createPropertyController = async (req, res) => {
    try{
        const { title, location, price, description,owner } = req.fields
        const {photoLink} = req.files
        

        switch (true) {
            case !title:
                return res.status(500).send({ error: "Name is Required" });
            case !location:
                return res.status(500).send({ error: "location is Required" });
            case !price:
                return res.status(500).send({ error: "price is Required" });
            case !description:
                return res.status(500).send({ error: "description is Required" });
            case !owner:
                return res.status(500).send({ error: "owner is Required" });
            case photoLink && photoLink.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }
        const property = new propertyModel({
            title,
            location,
            price,
            owner,
            description,
            photoLink: {
                data: fs.readFileSync(photoLink.path),
                contentType: photoLink.type,
            },
        });

        await property.save();

        res.status(201).send({
            success: true,
            message: "Property Created Successfully",
            property,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in creating Property",
        })
    }
}
const getProductController = async (req, res) =>{
    try {
        const properties = await propertyModel.find({}).select().limit(12).sort({createdAt: -1})
        const propertiesWithPhotoURL = properties.map(property => {
            return {
                _id: property._id,
                title: property.title,
                location: property.location,
                price: property.price,
                description: property.description,
                photoLink: `/api/v1/property/photo/${property._id}`, // Assuming the photoLink stores the photo's data and contentType
            };
        });

        res.status(200).send({
            success: true,
            countTotal: properties.length,
            message: "All Properties",
            properties: propertiesWithPhotoURL,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting property",
            error: error.message,
        });
    }
}

const getPhotoController = async (req, res) => {
    try {
        const property = await propertyModel.findById(req.params.id);

        if (!property || !property.photoLink) {
            return res.status(404).send({ error: "Photo not found" });
        }
        res.set('Content-Type', property.photoLink.contentType);

        res.send(property.photoLink.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
}

const deletePropertyController = async (req, res) => {
    try {
        const deletedProperty =await propertyModel.findByIdAndDelete(req.params.pid);
        if (!deletedProperty) {
            return res.status(404).send({
                success: false,
                message: "Property not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Property Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};
const router = express.Router();



router.post('/create-property', formidable(),createPropertyController);
router.get('/get-property',getProductController);
router.get('/photo/:id', getPhotoController);
router.delete('/delete-property/:id',deletePropertyController);
export default router;
