import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const NewsLetterBox = () => {
    return (
        <div className='text-center  py-10 mt-16'>
            <h2 className='text-2xl font-medium mb-4'>Subscribe to Our Newsletter</h2>
            <p className='text-gray-600 mb-6'>Stay updated with our latest offers and updates!</p>
            <div className='flex justify-center gap-4'>
                <input
                    type="email"
                    placeholder='Enter your email'
                    className='w-full max-w-xs px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600'
                />
                <button className='px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200'>
                    Subscribe
                </button>
            </div>
        </div>
    );
};

const About = () => {
    return (
        <div className='bg-white'>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={' US'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:w-[450px] md:max-w-[50%] object-cover' src={assets.about_img} alt="About Us" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Forever was born out of a passion for innovation and a desire to revolutionize the way we shop. Since our inception, we've worked tirelessly to curate a diverse selection of products that cater to every taste and preference.</p>
                    <p className='text-gray-600'>Our mission at Forever is to empower customers with choice, convenience, and a seamless shopping experience. We're dedicated to providing high-quality products and exceptional service to ensure your satisfaction.</p>
                    <p className='text-gray-600'>Join us on this journey as we continue to grow and bring you the latest trends and essentials, all while maintaining our commitment to sustainability and customer happiness.</p>
                </div>
            </div>

            <div className='text-2xl py-4'>

            <Title text1={'Why'} text2={'Choose Us'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our high standards of quality and durability.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>With our user-friendly interface and hassle-free delivery, shopping has never been easier.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way.</p>
                </div>
            </div>
            <NewsLetterBox />
        </div>
    );
};

export default About;