import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },  
    images :{
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const propertyModel = mongoose.model('property', propertySchema);

export default propertyModel;