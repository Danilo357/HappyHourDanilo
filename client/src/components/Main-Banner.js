import React from "react"
import { Link } from "react-router-dom"
import "../styles/Main-Banner.css"
import { HashLink as Link2 } from "react-router-hash-link"

function Banner() {
  return (
    <div className="banner">

      <div className="bannerTop">
        <div className="bannerLogo">HappyHoursNow!</div>
        <div className="nav">
          <Link className="bannerSignUp" to={"/Register"}>
            Sign Up
          </Link>
          <Link className="bannerLogIn" to={"/Login"}>
            Log In
          </Link>

       

        </div>
      </div>
      <div className="bannerBottom">
        <div className="bannerMessageDiv">
          <div className="bannerMessage">Find Your Favorite Happy Hour</div>
          <Link2 smooth to="#go" className="bannerGoBtn">
            Go!
          </Link2>
        </div>
        <div className="bannerTagLine">
          Because it's just not the same without YOU!
        </div>
      </div>
    </div>
  )
}
export default Banner
