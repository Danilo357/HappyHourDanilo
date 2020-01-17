import React from "react"
import "../styles/Main.css"
import MainBanner from "./Main-Banner"
import Slider from "../components/Slider"
import Slider2 from "../components/Slider2"
import Gmap from "../components/Gmap"
import ContactForm from "./ContactForm"
import Footer from "./Footer"

function Main() {
  return (
    <div className="mainContainer">
      <MainBanner />
      <Slider />
      <Slider2 />
      <Gmap />
      <ContactForm />
      <Footer />
    </div>
  )
}
export default Main