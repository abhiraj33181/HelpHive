import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Testinomials from './components/Testinomials'
import FAQ from './components/FAQ'

const App = () => {
  return (
    <>
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero/>
      <Testinomials/>
      <FAQ/>
    </div>
    </>
  )
}

export default App