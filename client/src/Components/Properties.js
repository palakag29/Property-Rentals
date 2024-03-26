import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Properties() {
    const [properties, setProperty] = useState([]);

    const getAllProperties = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/property/get-property`)
            setProperty(data.properties)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getAllProperties()
        getAllProperties()
    }, [])

    return (
        <div className="px-20 grid grid-cols-4  mt-8 ">
            {properties.length > 0 && properties.map(p => (
                <div key={p._id}>
                    <div className="rounded-2xl flex max-w-60 mt-4"  >
                        <img src={`${process.env.REACT_APP_API}/api/v1/property/photo/${p._id}`} alt={p.titke} className="object-cover aspect-square rounded-2xl " />

                    </div>
                    <div className="max-w-60">
                        <div className="flex justify-between mr-2 ">

                            <h5 className="text-m font-bold">{p.title}</h5>
                            <p>Rs.{p.price}</p>
                        </div>
                        <h5 className="text-sm">{p.location}</h5>
                        {/* <h5 className="truncate text-sm">{p.description}</h5> */}

                    </div>

                </div>
            ))
            }
        </div>
    )
}