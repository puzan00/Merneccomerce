import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    return (
        <div className='border-t pt-16 pb-12 px-4 sm:px-8 md:px-12 bg-gray-50'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-4xl font-bold text-gray-800 mb-10 pl-2'>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>

                <div className='space-y-6'>
                    {products.slice(1, 4).map((item, index) => (
                        <div
                            key={index}
                            className='py-6 px-5 border-b border-gray-200 bg-white flex flex-col md:flex-row md:items-center gap-8 hover:bg-gray-50 transition duration-200 rounded-lg shadow-sm'
                        >
                            {/* Product info section - fixed width on desktop */}
                            <div className='flex items-center gap-6 md:w-1/2'>
                                <img
                                    className='w-24 h-24 object-cover rounded-lg border border-gray-200'
                                    src={item.image[0]}
                                    alt={item.name}
                                />
                                <div className='space-y-3'>
                                    <p className='text-xl font-semibold text-gray-900'>{item.name}</p>
                                    <div className='flex items-center gap-6 text-gray-600'>
                                        <p className='text-base'>Quantity: 1</p>
                                        <p className='text-base'>Size: M</p>
                                    </div>
                                    <p className='text-base text-gray-500'>
                                        Date: <span className='font-medium'>25, Jun</span>
                                    </p>
                                </div>
                            </div>
                            
                            {/* Status and button section with fixed layout */}
                            <div className='flex-1 grid md:grid-cols-2 gap-4 items-center mt-4 md:mt-0'>
                                {/* Status indicator always centered in its column */}
                                <div className='flex items-center justify-center gap-3'>
                                    <div className='w-3 h-3 rounded-full bg-green-500'></div>
                                    <p className='text-base font-medium text-green-600'>Ready to ship</p>
                                </div>
                                
                                {/* Track orders button */}
                                <div className='flex justify-center md:justify-end'>
                                    <button className='text-blue-600 hover:text-blue-800 font-medium text-base hover:underline transition duration-200 px-4 py-2'>
                                        Track Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;