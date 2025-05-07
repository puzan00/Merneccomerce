import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const { setToken, token, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (currentState === "Sign Up") {
                const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Registration successful!");
                } else {
                    toast.error(response.data.message || "Registration failed");
                }
            } else {
                const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login successful!");
                } else {
                    toast.error(response.data.message || "Login failed");
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error(error.response?.data?.message || error.message || "Authentication failed");
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-center bg-white p-6 rounded-lg shadow-md'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl text-gray-800'>
                    {currentState.toUpperCase()}
                </p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            <div className='w-full space-y-4'>
                {currentState === 'Sign Up' && (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                        placeholder='Name'
                        required
                    />
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                    placeholder='Email'
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                    placeholder='Password'
                    required
                />
                <button
                    type="submit"
                    className='w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200'
                >
                    {currentState}
                </button>
                <p className='text-sm text-gray-600'>
                    {currentState === 'Login' ? 'Need an account?' : 'Already have an account?'}{' '}
                    <button
                        type="button"
                        onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                        className='text-blue-600 hover:underline'
                    >
                        {currentState === 'Login' ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </form>
    );
};

export default Login;