import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios'
export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
            });
            if (res && res.data.success) {
                console.log(res.data && res.data.message);
                alert('Registration successful');
                navigate("/login");
            } else {
                alert('Something went wrong in registration');
                console.log.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log("Something went wrong");
        }
    };
    
    return (
        <div><Header />
            <div className="mt-4 grow flex items-center justify-around pt-32">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit} >
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone" />
                        <button className="primary">Register</button>
                        <div className="text-center py-2 text-gray-500">
                            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}