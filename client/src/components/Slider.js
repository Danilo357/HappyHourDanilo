import React, { useState } from "react"
import Coverflow from "react-coverflow"
import { Link } from "react-router-dom"
import { useUsers } from "../hooks"
import "../styles/Slider.css"

function Slider(props) {
  const { users } = useUsers()

  const [time, setTime] = useState("")
  const [search, setSearch] = useState("")

  var d = new Date()
  var hr = d.getHours()
  // const fn = function() {} // slider library
  const newTime = users.filter(p => time >= p.starthour && time <= p.endhour)
  const newSearch = users.filter(p => p.companyname.toLowerCase() == search)

  return (
    <div id="go" className="sliderMainContainer">
      <div className="sliderSearchBar">
        <div className="sliderSearchBar1">
          <a className="sliderSearchBar1DropDown">
            Happy Hours (select time) !
            <br />
            <select onChange={e => setTime(e.target.value)}>
              <option value=""> Select</option>
              <option value="00">12:00 am</option>
              <option value="01">1:00 am</option>
              <option value="02">2:00 am</option>
              <option value="03">3:00 am</option>
              <option value="04">4:00 am</option>
              <option value="05">5:00 am</option>
              <option value="06">6:00 am</option>
              <option value="07">7:00 am</option>
              <option value="08">8:00 am</option>
              <option value="09">9:00 am</option>
              <option value="10">10:00 am</option>
              <option value="11">11:00 am</option>
              <option value="12">12:00 pm</option>
              <option value="13">1:00 pm</option>
              <option value="14">2:00 pm</option>
              <option value="15">3:00 pm</option>
              <option value="16">4:00 pm</option>
              <option value="17">5:00 pm</option>
              <option value="18">6:00 pm</option>
              <option value="19">7:00 pm</option>
              <option value="20">8:00 pm</option>
              <option value="21">9:00 pm</option>
              <option value="22">10:00 pm</option>
              <option value="23">11:00 pm</option>
            </select>
          </a>
        </div>

        <div className="sliderSearchBar2">
          <a className="hhhNow" onClick={e => setTime(hr)}>
            Happy Hours Happening Now!
            <br />
            <span className="hhhNowClickHere">(Click Here)</span>
          </a>
        </div>

        <div className="sliderSearchBar3">
          <a className="sliderSearchBar3DropDown">
            Search (by company)!
            <br />
            <input
              className="searchBar"
              placeholder="Search"
              type="text"
              onChange={e => setSearch(e.target.value)}
            />
          </a>
          {newSearch.map((user, i) => (
            <Link to={`/SingleViewPage/${user.id}`}>
              <img
                key={i}
                className="slidePics"
                src={user.picture}
                height={100}
                alt={
                  <Link className="sliderImg" to={`/SingleViewPage/${user.id}`}>
                    {user.companyname}
                  </Link>
                }
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="CoverflowContainer">
        <Coverflow
          width="960"
          height="900"
          displayQuantityOfSide={2}
          navigation={false}
          enableScroll={false}
          clickable={true}
          active={5}
        >
          {newTime.length === 0
            ? users.map((user, i) => (
                <img
                  key={i}
                  className="slidePics"
                  src={user.picture}
                  height={450}
                  alt={
                    <Link
                      className="sliderImg"
                      to={`/SingleViewPage/${user.id}`}
                    >
                      {user.companyname}
                    </Link>
                  }
                />
              ))
            : newTime.map((user, i) => (
                <img
                  key={i}
                  className="slidePics"
                  src={user.picture}
                  height={450}
                  alt={
                    <Link
                      className="sliderImg"
                      to={`/SingleViewPage/${user.id}`}
                    >
                      {user.companyname}
                    </Link>
                  }
                />
              ))}
        </Coverflow>
      </div>
    </div>
  )
}
export default Slider
