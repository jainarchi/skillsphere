import React from 'react'
import Navbar from '../components/navbar/Navbar'
import QuizCatagory from '../components/quiz/QuizCatagory'
import MainPageView from '../components/MainPageView'
import Footer from '../components/footer/Footer'

const Home = () => {
  return (
    <div  className="h-screen overflow-y-auto hide-scrollbar" >
        <Navbar />
        <MainPageView />
        <QuizCatagory />

        <Footer />

      
    </div>
  )
}

export default Home
