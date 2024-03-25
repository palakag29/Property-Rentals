import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProperty() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [photoFile, setPhotoFile] = useState(null);  // Updated state to store the selected photo file
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [price, setPrice] = useState(100);
    const navigate = useNavigate();

    const handleAddPropertySubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('location', location);
            formData.append('photoLink', photoFile);  // Append the selected photo file to the form data
            formData.append('description', description);
            formData.append('owner', owner);
            formData.append('price', price);

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/property/create-property`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Set the content type for form data
                }
            });

            if (res && res.data.success) {
                console.log(res.data.message);
                alert('Added');
                navigate("/");
            } else {
                console.log(res.data.message);
                alert('Not Added');
                // Handle error
            }
        } catch (error) {
            alert('Not Added');
            console.log("Something went wrong:", error);
            // Handle error
        }
    };

    // Function to handle photo file selection
    const handlePhotoFileChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
    };

    return (
        <div>
            <Header />
            <div className="grow pt-16">
                <h1 className="text-4xl text-center mb-4">Add Property</h1>
                <form className="max-w-md mx-auto" onSubmit={handleAddPropertySubmit}>
                    <h2 className="mt-2 -mb-1 font-bold">Title</h2>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title, for example: My lovely apt" />
                    <h2 className="mt-2 -mb-1 font-bold">Owner</h2>
                    <input type="text" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner"/>
                    <h2 className="mt-2 -mb-1 font-bold">Location</h2>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
                    <h2 className="text-2xl mt-4">Photos</h2>
                    <input type="file" accept="image/*" onChange={handlePhotoFileChange} /> {/* Input for selecting a photo file */}
                    <h2 className="mt-2 -mb-1 font-bold">Description</h2>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    <div>
                        <h3 className="mt-2 -mb-1 font-bold">Price</h3>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>
        </div>
    )
}
