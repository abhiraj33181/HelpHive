import Header from '../components/Header'
import Hero from '../components/Home/Hero'
import FAQ from '../components/Home/FAQ'
import Footer from '../components/Footer'
import Testimonials from '../components/Home/Testinomials'
import TopProvider from '../components/Home/TopProvider'
import Banner from '../components/Home/Banner'

function Home() {
    return (
        <>
            <div className="min-h-screen bg-white">
                <Hero />
                <div className='mx-4 sm:mx-[10%]'>
                    <TopProvider/>
                    <Banner/>
                </div>
                <Testimonials />
                <FAQ />
            </div>
        </>
    )
}

export default Home