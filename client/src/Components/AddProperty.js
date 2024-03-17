import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddProperty(){
    const [title, setTitle] = useState('');
    const [location, setlocation] = useState('');
    const [photoLink, setphotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(100);
    const navigate = useNavigate();

    const handleAddPropertySubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/property/create-property`, {
                title,
                location,
                photoLink,
                description,
                price,
            });
            if (res && res.data.success) {
                console.log(res.data.message);
                alert('Added')
                navigate("/"); 
            } else {
                console.log(res.data.message);
                alert('Not Added')
                // Handle error
            }
        } catch (error) {
            alert('Not Added')
            console.log("Something went wrong:", error);
            // Handle error
        }
    };
    return(
        <div>
            <Header/>
            <div className="grow pt-16">
            <h1 className="text-4xl text-center mb-4">Add Property</h1>
                <form className="max-w-md mx-auto" onSubmit={handleAddPropertySubmit}>
                <h2 className="mt-2 -mb-1 font-bold">Title</h2>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apt" />
                <h2 className="mt-2 -mb-1 font-bold">Location</h2>
                <input type="text" value={location} onChange={e => setlocation(e.target.value)} placeholder="location" />
                <h2 className="text-2xl mt-4">Photos</h2>
                <div className="flex">
                        <input type="text" value={photoLink} onChange={e => setphotoLink(e.target.value)} placeholder="Add using a link" />
                        
                </div>
                    {/* <button className="border bg-transparent bg-gray-200 px-4 rounded-2xl">+</button> */}
                <h2 className="mt-2 -mb-1 font-bold">Description</h2>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <div>
                    <h3 className="mt-2 -mb-1 font-bold">Price</h3>
                    <input type="number" value={price}
                        onChange={e => setPrice(e.target.value)} />
                </div>
                    <button className="primary my-4">Save</button>
            </form>
            </div>
        </div>
    )
}