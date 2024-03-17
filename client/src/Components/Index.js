import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

export default function IndexPage() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/properties`);
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div>
            <Header/>
            <h1>Properties</h1>
            <div>
                {properties.map(property => (
                    <div key={property._id}>
                        <h2>{property.title}</h2>
                        <p>Location: {property.location}</p>
                        <p>Price: {property.price}</p>
                        <p>Description: {property.description}</p>
                        <img src={property.photoLink} alt={property.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}
