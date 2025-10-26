import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Testimonials from '../components/Testinomials'

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