import React from "react"
import Header from "./Header"
import Footer from "./Footer"
// import stylesheet
import "../styles/AboutUs.css"
// import assets
import DaniloPic from "../assets/Danilo.jpg"
import AinhoaPic from "../assets/Ainhoa.jpg"
import LazPic from "../assets/teamMember1.jpg"

export default props => {
  return (
    <div className="aboutUsMainContainer">
      <Header />
      <div className="row">
        <div className="column">
          <div className="card">
            <img
              className="daniloPic"
              src={DaniloPic}
              alt="Danilo Nikolic"
              style={{
                display: "block",
                width: "100%"
              }}
            />
            <div className="container">
              <h2>Danilo Nikolic</h2>
              <p className="title">CEO &amp; Founder</p>
              <p>
                All-around great guy who loves IPA's and always ready for action
                !
              </p>

              <p>Danilo@hhf.com</p>
              <p>
                <a href="https://www.linkedin.com/in/danilo-nikoli%C4%87-1b239b18b/">
                  <button className="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              className="ainhoaPic"
              src={AinhoaPic}
              alt="Ainhoa Martinez"
              data-action="our link"
              style={{
                display: "block",
                width: "100%"
              }}
            />
            <div className="container">
              <h2>Ainhoa Martinez</h2>
              <p className="title">Art Director</p>
              <p>
                Queen of the foosball table. Favorite team: Atletico Madrid!
              </p>
              <p>Ainhoa@hhf.com</p>
              <p>
                <a href="https://www.linkedin.com/in/ainhoa-martinez-iribas">
                  <button className="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              className="lazPic"
              src={LazPic}
              alt="Steve Lazarus"
              data-action="our link"
              style={{
                display: "block",
                width: "100%"
              }}
            />
            <div className="container">
              <h2>Steve Lazarus</h2>
              <p className="title">Designer</p>
              <p>
                You want to do what? And how are we going to make money at that?
              </p>
              <p>Laz@hhf.com</p>
              <p>
                <a href="https://www.linkedin.com/in/steve-lazarus-487568177">
                  <button className="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
