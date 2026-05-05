import React from 'react'
import Header from '../pages/Header'
import InterviewGenerate from '../pages/Interview.generate'
import Footer from '../pages/Footer'

const Home = () => {
  return (
    <main className='h-screen flex flex-col w-full'>
        <Header></Header>
        <InterviewGenerate></InterviewGenerate>
        <Footer></Footer>
    </main>
  )
}

export default Home