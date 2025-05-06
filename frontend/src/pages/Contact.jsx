import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const contactDetails = [
        { icon: <FaPhoneAlt />, title: "Customer Support", info: "+1 (888) 123-4567", link: "tel:+18881234567" },
        { icon: <FaEnvelope />, title: "Email Support", info: "support@foreverstore.com", link: "mailto:support@foreverstore.com" },
        { icon: <FaMapMarkerAlt />, title: "Our Warehouse", info: "123 Commerce Street\nEcommerce Park, CA 98765" },
        { icon: <FaClock />, title: "Business Hours", info: "Mon-Fri: 9AM - 8PM EST\nSat-Sun: 10AM - 6PM EST" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <Title text1="CONTACT" text2="SUPPORT" />
                    <p className="mt-4 text-lg text-gray-600">
                        We're here to help with your orders, returns, and any questions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {contactDetails.map((item, index) => (
                                <div 
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl text-gray-700">{item.icon}</span>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                    </div>
                                    {item.link ? (
                                        <a 
                                            href={item.link}
                                            className="text-gray-600 whitespace-pre-line hover:text-gray-900 transition-colors"
                                        >
                                            {item.info}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 whitespace-pre-line">{item.info}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                                    <FaInstagram className="w-6 h-6" />
                                </a>
                                <a href="#" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                   
                  
                        
                        <img
                            src={assets.contact_img}
                            alt="Warehouse location map"
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                        />
                    
                </div>

         </div>
         </div>
    );
};

export default Contact;