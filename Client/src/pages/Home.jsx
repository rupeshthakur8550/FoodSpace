import React from 'react'
import Banner from '../components/Home/Banner'
import About from '../components/Home/About'
import Contact from '../components/Home/Contact'

const Home = () => {
    return (
        <div className='min-h-screen text-black'>
            <Banner />
            <About />
            <Contact />
        </div>
    )
}

export default Home