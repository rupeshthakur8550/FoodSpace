import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundBanner from '../../assets/BackgroundBanner.png';

const Banner = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/signin');
    };

    return (
        <section
            id='home'
            className="banner relative h-screen overflow-hidden bg-cover bg-center flex justify-center items-center mb-2"
            style={{ backgroundImage: `url(${BackgroundBanner})` }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div
                className={`banner-content relative text-center text-white flex flex-col justify-center p-6 sm:p-10 lg:p-20 animation:fadeIn`} style={{ animation: 'fadeIn 1s ease-out' }}
            >
                <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold tracking-wide mb-8" style={{ animation: 'slideIn 1s ease-out' }}>
                    Welcome To <span className='px-4 py-2 bg-gradient-to-r from-red-400 via-pink-400 to-purple-600 rounded-lg inline-block text-transparent bg-clip-text text-nowrap' style={{ fontVariant: 'unicase' }}>Food Space</span>
                </h1>
                <h3 className="text-xl sm:text-xl lg:text-2xl font-semibold mb-12 border-b text-pretty border-orange-500 pb-2 mx-4" style={{ animation: 'slideIn 1s ease-out 0.4s forwards' }}>
                    Where cravings meet convenience! Discover a world of delectable cuisines, explore local eateries, and indulge in your favorite dishes — all without the hassle of online payments or delivery partners. We’re your go-to platform for satisfying those food cravings, one order at a time.
                </h3>
                <button
                    style={{ color: 'white', animation: 'slideIn 1s ease-out 0.8s forwards' }}
                    className="self-center hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white md:w-[25%] w-[40%] transition-transform transform hover:scale-105 rounded-md h-9 border-2 text-white border-white lg:w-[12vw]"
                    onClick={handleNavigate}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Banner;
