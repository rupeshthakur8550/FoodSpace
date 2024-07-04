import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Dropdown, TextInput, Avatar } from "flowbite-react";
import { HiOutlineShoppingCart, HiSearch } from "react-icons/hi";
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Header = () => {
    const { getTotalCartAmount, user, logout, setSearch } = useContext(StoreContext);
    const [headerValue, setHeaderValue] = useState(user ? 'Menu' : 'Home');
    const [linkValue, setLinkValue] = useState(user ? '/menu' : '/');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Update header and link values based on user and current route
        setHeaderValue(user ? 'Menu' : 'Home');
        setLinkValue(user ? '/menu' : '/');
    }, [user, location.pathname]);

    const handleDropdownItemClick = (value, link) => {
        setHeaderValue(value);
        setLinkValue(link);
        if (value === 'Search Item') {
            setShowSearchInput(true);
        } else {
            setShowSearchInput(false);
        }
        navigate(link);
    };

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                logout();
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = -60;
            const sectionPosition = section.offsetTop + offset;
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? (scrolled ? 'bg-white shadow-lg' : 'bg-transparent') : 'bg-white shadow-lg'}`}>
            <Navbar className={`${isHomePage ? (scrolled ? 'bg-white' : 'bg-transparent') : 'bg-white'}`}>
                <Link to='/' className={`self-center whitespace-nowrap text-xl sm:text-3xl font-extrabold ${isHomePage ? (scrolled ? 'text-black' : 'text-white') : 'text-black'}`} style={{ fontVariant: 'unicase' }}>
                    <span className='px-2 py-1 bg-gradient-to-r from-orange-500 from-30% via-sky-500 via-50% to-emerald-500 to-90% inline-block text-transparent bg-clip-text'>Food Space</span>
                </Link>
                {user ? (
                    <div className='flex sm:justify-between justify-end items-center w-[65%]'>
                        <div className='flex items-center md:gap-8 md:pl-[2vw]'>
                            <NavLink
                                to="/menu"
                                className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-black") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} border-b border-transparent hover:bg-gray-50 lg:hover:bg-transparent md:border-0 hover:text-teal-600 lg:p-0 font-semibold hidden sm:block`}
                            >
                                Menu
                            </NavLink>
                            {showSearchInput && (
                                <TextInput
                                    type="text"
                                    placeholder="Search Items.."
                                    icon={HiSearch}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-b my-1"
                                    style={{ height: "5vh", outline: "none" }}
                                />
                            )}
                            <TextInput
                                type="text"
                                placeholder="Search Items.."
                                icon={HiSearch}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border-b hidden sm:block w-[25vw]"
                                style={{ height: "5.5vh", outline: "none" }}
                            />
                            <NavLink
                                to="/cart"
                                className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-black") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} border-b border-transparent hover:bg-gray-50 lg:hover:bg-transparent md:border-0 hover:text-teal-600 lg:p-0 font-semibold hidden sm:block`}
                            >
                                <div className='flex gap-2 items-center relative'>
                                    Cart <HiOutlineShoppingCart className='w-7 h-7' />
                                    {getTotalCartAmount() !== 0 && <div className='absolute bg-orange-500 h-2 w-2 bottom-6 left-16 rounded-full'></div>}
                                </div>
                            </NavLink>
                            <NavLink
                                to={linkValue}
                                className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-orange-700") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} font-semibold mr-2 md:mr-3 block sm:hidden`}
                            >
                                {headerValue === 'Search Item' ? "" : headerValue}
                            </NavLink>
                            <div className='block sm:hidden mr-4'>
                                <Dropdown inline>
                                    <Dropdown.Item className='text-md' onClick={() => handleDropdownItemClick('Menu', '/menu')}>
                                        Menu
                                    </Dropdown.Item>
                                    <Dropdown.Item className='text-md' onClick={() => handleDropdownItemClick('Search Item', '/menu')}>
                                        Search Item
                                    </Dropdown.Item>
                                    <Dropdown.Item className='text-md' onClick={() => handleDropdownItemClick('Cart', '/cart')}>
                                        Cart <HiOutlineShoppingCart />
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Dropdown arrowIcon={false} inline label={
                                <Avatar
                                    alt='user'
                                    img='https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU='
                                    rounded className='w-10 h-5' />
                            }>
                                <Dropdown.Header className='text-center'>
                                    {`Welcome, ${user.name}`}
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Dropdown.Item className='text-md font-semibold justify-center' onClick={() => navigate('/dashboard')}>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item className='text-md font-semibold justify-center' onClick={handleSignout}>
                                    Sign Out
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-wrap sm:gap-3 items-center'>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-orange-700") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} font-semibold hidden sm:block`}
                            onClick={() => scrollToSection('home')}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="#"
                            className={({ isActive }) => `block py-2 pr-[1vw] pl-[1vw] duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-orange-700") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} font-semibold hidden sm:block`}
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="#"
                            className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-orange-700") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} font-semibold mr-2 md:mr-3 hidden sm:block`}
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact Us
                        </NavLink>
                        <div className='block sm:hidden mr-5'>
                            <Dropdown inline arrowIcon={false} className={`${isHomePage && !scrolled ? "bg-transparent" : ""}`} label={<NavLink
                                to={linkValue}
                                className={({ isActive }) => `block py-2 px-2 duration-200 ${isActive ? (isHomePage && !scrolled ? "text-white" : "text-orange-700") : (isHomePage && !scrolled ? "text-gray-200" : "text-gray-700")} font-semibold bg-transparent text-md block sm:hidden`}
                            >
                                {headerValue}
                            </NavLink>}>
                                <Dropdown.Item className={`text-md ${isHomePage && !scrolled ? "text-gray-200" : "text-gray-900"}`} onClick={() => {
                                    scrollToSection('home');
                                    handleDropdownItemClick('Home', '/');
                                }}>
                                    Home
                                </Dropdown.Item>
                                <Dropdown.Item className={`text-md ${isHomePage && !scrolled ? "text-gray-200" : "text-gray-900"}`} onClick={() => {
                                    scrollToSection('about');
                                    handleDropdownItemClick('About', '#');
                                }}>
                                    About
                                </Dropdown.Item>
                                <Dropdown.Item className={`text-md ${isHomePage && !scrolled ? "text-gray-200" : "text-gray-900"}`} onClick={() => {
                                    scrollToSection('contact');
                                    handleDropdownItemClick('Contact Us', '#');
                                }}>
                                    Contact Us
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                        <Link
                            to="/signin"
                            className={`relative px-5 py-2 overflow-hidden font-semibold ${scrolled || !isHomePage ? 'text-gray-900' : 'text-white'} bg-clip-text text-nowrap rounded-lg shadow-inner group`}
                        >
                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-white group-hover:w-full ease"></span>
                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-white group-hover:w-full ease"></span>
                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-white group-hover:h-full ease"></span>
                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-white group-hover:h-full ease"></span>
                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gradient-to-r from-red-400 via-pink-400 to-purple-600 opacity-0 group-hover:opacity-100"></span>
                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-black">
                                Sign In
                            </span>
                        </Link>
                    </div>
                )}
            </Navbar>
        </div>
    );
};

export default Header;
