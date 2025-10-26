import React from 'react'
import Header from '../components/Home/Header'
import Hero from '../components/Home/Hero'
import FAQ from '../components/Home/FAQ'
import Footer from '../components/Home/Footer'
import Testimonials from '../components/Home/Testinomials'

function Home() {
    return (
        <>
            <div className="min-h-screen bg-white">
                <Header />
                <Hero />
                <Testimonials />
                <FAQ />
                <Footer />
            </div>
        </>
    )
}

export default Home