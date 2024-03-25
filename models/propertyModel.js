import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
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
    owner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },  
    photoLink :{
        data:Buffer,
        contentType:String
        // type: String,
        // required: true,
    },
    // perks:[String],
},
    { timestamps: true }
);

const propertyModel = mongoose.model('property', propertySchema);

export default propertyModel;