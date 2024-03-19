import Header from "./Header";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { name, setName } = useContext(UserContext);
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                console.log(res.data && res.data.message);
                alert('Login Successful');
                setName(res.data.user.name);
                navigate("/");
            } else {
                alert('Invalid Email or Password');
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log("Something went wrong");
        }
    };
    return (
        <div>
            <Header />
            <div className="mt-4 grow flex items-center justify-around pt-32">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                        <input type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                              />
                        <input type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                              />
                        <button className="primary pt-4">Login</button>
                        <div className="text-center py-2 text-gray-500">
                            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}