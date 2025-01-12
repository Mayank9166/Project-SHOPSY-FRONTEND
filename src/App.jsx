import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import aos from 'aos'
import 'aos/dist/aos.css';
import TopProducts from './components/TopProducts/TopProducts'
import Banner from './components/Banner/Banner'
import Subscribe from './components/Subscribe/Subscribe'
import Testinomials from './components/Testinomials/Testinomials'
import Footer from './components/Footer/Footer'
import Popup from './components/Popup/Popup'
const App = () => {
  React.useEffect(() => {
    aos.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    aos.refresh();
  }, []);
  const [orderPopup, setOrderPopup] = useState(false)
  const handlepop =()=>{
    setOrderPopup(!orderPopup)
  }
  return (
    <div className='dark:bg-gray-900 dark:text-white bg-white duration-200' >
      <Navbar handlepop={handlepop}/>
      <Hero/>
      <Products/>
      <TopProducts/>
      <Banner/>
      <Subscribe/>
      <Products/>
      <Testinomials/>
      <Footer/>
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
    </div>
  )
}

export default App
