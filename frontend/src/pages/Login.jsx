import React, { useState } from 'react';

const Login = () => {
    const [currentState, setCurrentState] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentState === 'login') {
            console.log({ email, password, rememberMe });
        } else if (currentState === 'signup') {
            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                return;
            }
            if (!agreeTerms) {
                console.log('Please agree to the terms');
                return;
            }
            console.log({ firstName, lastName, email, password, agreeTerms });
        } else if (currentState === 'forgot') {
            console.log('Password reset requested for:', { email });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-center bg-white p-6 rounded-lg shadow-md'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl text-gray-800'>
                    {currentState === 'forgot' ? 'FORGOT PASSWORD' : currentState.toUpperCase()}
                </p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            <div className='w-full space-y-4'>
                {currentState === 'signup' && (
                    <>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                            placeholder='First Name'
                            required
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                            placeholder='Last Name'
                            required
                        />
                    </>
                )}
                {(currentState === 'login' || currentState === 'signup' || currentState === 'forgot') && (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                        placeholder='Email'
                        required
                    />
                )}
                {(currentState === 'login' || currentState === 'signup') && (
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                        placeholder='Password'
                        required
                    />
                )}
                {currentState === 'signup' && (
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-800 placeholder:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                        placeholder='Confirm Password'
                        required
                    />
                )}
                {currentState === 'login' && (
                    <>
                        <div className='flex items-center justify-between gap-2'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className='h-4 w-4 text-gray-800 border-gray-800 rounded focus:ring-gray-600'
                                />
                                <label className='text-sm text-gray-600'>Remember Me</label>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCurrentState('forgot')}
                                className='text-sm text-blue-600 hover:underline'
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </>
                )}
                {currentState === 'signup' && (
                    <div className='flex items-center justify-start gap-2'>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className='h-4 w-4 text-gray-800 border-gray-800 rounded focus:ring-gray-600'
                            required
                        />
                        <label className='text-sm text-gray-600'>
                            I agree to the <span className='text-blue-600 hover:underline cursor-pointer'>Terms & Conditions</span>
                        </label>
                    </div>
                )}
                {currentState === 'forgot' && (
                    <p className='text-sm text-gray-600'>
                        Enter your email to receive a password reset link.
                    </p>
                )}
                <button
                    type="submit"
                    className='w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200'
                >
                    {currentState === 'login' ? 'Log In' : currentState === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                </button>
                {currentState !== 'forgot' ? (
                    <p className='text-sm text-gray-600'>
                        {currentState === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            onClick={() => setCurrentState(currentState === 'login' ? 'signup' : 'login')}
                            className='text-blue-600 hover:underline'
                        >
                            {currentState === 'login' ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                ) : (
                    <p className='text-sm text-gray-600'>
                        Back to{' '}
                        <button
                            type="button"
                            onClick={() => setCurrentState('login')}
                            className='text-blue-600 hover:underline'
                        >
                            Log In
                        </button>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;