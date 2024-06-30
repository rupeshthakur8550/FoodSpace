import React, { useEffect, useState } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const aboutSection = document.querySelector('#about');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1,
        });

        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => {
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
        };
    }, []);

    return (
        <>
            <section id='about' className="banner relative overflow-hidden bg-cover bg-gray-800 bg-center flex justify-center items-center m-2">
                <div className="container mx-auto mt-10">
                    <div className={`text-white text-justify md:text-center ${isVisible ? 'animate-fadeIn' : ''}`} style={{ animation: isVisible ? 'fadeIn 1s ease-out' : 'none' }}>
                        <h1 className={`text-3xl md:text-5xl font-mono tracking-wider text-center mb-8 ${isVisible ? 'animate-slideIn' : ''}`} style={{ animation: isVisible ? 'slideIn 1s ease-out' : 'none' }}> About Food Space </h1>
                        <p className="text-lg lg:text-xl mx-8 mb-4 text-justify" style={{ animation: isVisible ? 'slideIn 1s ease-out 0.2s forwards' : 'none' }}>
                            Welcome to Food Space, your ultimate destination for exploring culinary delights from a variety of sellers, ranging from cloud kitchens to small and large restaurants. Whether you're craving a gourmet meal or a quick snack, Food Space has something for everyone.
                        </p>
                        <p className="text-lg lg:text-xl mx-8 mb-4 text-justify" style={{ animation: isVisible ? 'slideIn 1s ease-out 0.4s forwards' : 'none' }}>
                            At Food Space, we believe that good food brings people together. That's why we empower sellers to showcase their unique dishes and set their own prices, ensuring that you, the customer, get the best deals directly from the source. Our platform is designed to connect food enthusiasts with a diverse array of culinary experiences, while also promoting sustainable food practices. By supporting local sellers and encouraging eco-friendly initiatives, we're not just satisfying appetites; we're making a positive impact on the world.
                        </p>
                        <div className="flex flex-wrap justify-center items-center text-center m-8 lg:mx-10 mx-auto">
                            <div className="md:w-1/3 w-full mt-5 px-2" style={{ animation: isVisible ? 'slideIn 1s ease-out 0.6s forwards' : 'none' }}>
                                <div className="py-6 backdrop-filter backdrop-blur-sm bg-gray-100 bg-opacity-70 rounded-lg shadow-md px-6 mx-auto text-center">
                                    <p className="text-black mb-2 text-justify font-semibold">
                                        At Food Space, we love finding lots of different types of yummy food for you to enjoy and taste. We have all kinds of tasty dishes, from old favorites to new and exciting ones. Food Space is like a treasure chest full of delicious food waiting for you to discover. We pick out the best dishes to make your taste buds happy and make your meals extra special.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/3 w-full mt-5 px-2" style={{ animation: isVisible ? 'slideIn 1s ease-out 0.8s forwards' : 'none' }}>
                                <div className="py-6 backdrop-filter backdrop-blur-sm bg-gray-100 bg-opacity-70 rounded-lg shadow-md px-6 mx-auto text-center">
                                    <p className="text-black mb-2 text-justify font-semibold">
                                        At Food Space, we think it's important to make a friendly place where everyone wins – the people selling food and the people buying it. Our website helps sellers talk to their customers and get helpful advice. And for customers, it's like having a friend who knows all about good food, with tips, deals, and a warm feeling of being part of our fun food family.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/3 w-full mt-5 px-2" style={{ animation: isVisible ? 'slideIn 1s ease-out 1s forwards' : 'none' }}>
                                <div className="py-6 backdrop-filter backdrop-blur-sm bg-gray-100 bg-opacity-70 rounded-lg shadow-md px-6 mx-auto text-center">
                                    <p className="text-black mb-2 text-justify font-semibold">
                                        At Food Space, we really care about taking care of the Earth. We work hard to make sure everything we do is good for the environment, from where we get our food ingredients to how we pack and deliver them. We team up with sellers who also care about the planet. Our goal is to help the Earth while still enjoying tasty food without feeling bad.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
