import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useUsers } from "../hooks"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "../styles/Slider2.css"
function Slider2() {
  const { users } = useUsers() 
  const [time, setTime] = useState("")
  const [search, setSearch] = useState("")
  var d = new Date()
  var hr = d.getHours()
  const fn = function() {} // slider library
  const newTime = users.filter(p => time >= p.starthour && time <= p.endhour)
  const newSearch = users.filter(p => p.companyname.toLowerCase() == search)

   return (
    <div className="sliderResponsive">
      <div className="filters">
        {/* <label>Happy Hours ( select time)! </label> */}
        <select className="dropDown" onChange={e => setTime(e.target.value)}>
          <option value=""> Select</option>
          <option value="00">12:00 am</option>
          <option value="01">01:00 am</option>
          <option value="02">02:00 am</option>
          <option value="03">03:00 am</option>
          <option value="04">04:00 am</option>
          <option value="05">05:00 am</option>
          <option value="06">06:00 am</option>
          <option value="07">07:00 am</option>
          <option value="08">08:00 am</option>
          <option value="09">09:00 am</option>
          <option value="10">10:00 am</option>
          <option value="11">11:00 am</option>
          <option value="12">12:00 pm</option>
          <option value="13">01:00 pm</option>
          <option value="14">02:00 pm</option>
          <option value="15">03:00 pm</option>
          <option value="16">04:00 pm</option>
          <option value="17">05:00 pm</option>
          <option value="18">06:00 pm</option>
          <option value="19">07:00 pm</option>
          <option value="20">08:00 pm</option>
          <option value="21">09:00 pm</option>
          <option value="22">10:00 pm</option>
          <option value="23">11:00 pm</option>
        </select>
        <button className="currentHH2" onClick={e => setTime(hr)}>
          H.H Happening Now !
        </button>
        <input
          className="searchBar1"
          placeholder="H.Hours ( by company )!"
          type="text"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {newSearch.map((user, i) => (
        <Link className="sl2Searchbar" to={`/SingleViewPage/${user.id}`}>
          {user.companyname}
          {/* <img
            key={"c" + i}
            className="slidePics"
            src={user.picture}
            height={100}
            alt={
              <a className="sliderImg" href={user.website}>
                {user.companyname}
              </a>
            }
          /> */}
        </Link>
      ))}
      <div>
        <Carousel
          autoPlay={true}
          useKeyboardArrows
          infiniteLoop={true}
          interval={4000}
          transitionTime={350}
        >
          {newTime.length === 0
            ? users.map((user, i) => (
                <>
                  <img
                    key={"a" + i}
                    className="slidePics2"
                    src={user.picture}
                    alt={
                      <a href={user.website}>
                        <p className="legend">{user.companyname}</p>
                      </a>
                    }
                  />
                  <a href={user.website}>
                    <p className="legend">{user.companyname}</p>
                  </a>
                </>
              ))
            : newTime.map((user, i) => (
                <>
                  <img
                    key={"b" + i}
                    className="slidePics2"
                    src={user.picture}
                    alt={<a href={user.website}>{user.companyname}</a>}
                  />
                  <a href={user.website}>
                    <p className="legend">{user.companyname}</p>
                  </a>
                </>
              ))}
        </Carousel>
        
      </div>
    </div>
  )
}
export default Slider2
