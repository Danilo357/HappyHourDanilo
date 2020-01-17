import React, { useState } from "react"
import GoogleMapReact from "google-map-react"
import { useMaps } from "../hooks"
import { useCompanies } from "../hooks"
import "../styles/Gmap.css"

export default props => {
  const { coordinates } = useMaps()
  const { companies } = useCompanies()
  const [clicked, setClick] = useState(false)
  const [currentPlace, setCurrentPlace] = useState({})
  const AnyReactComponent = ({ text }) => (
    <div className="pinContainer" onClick={e => handleOnClick(e, text)}>
      <img
        alt=""
        className="pinImg"
        src="https://firebasestorage.googleapis.com/v0/b/happy-717c5.appspot.com/o/flyers%2F79cbf552-d272-4c39-b0ba-d1ebb4e1c74b.png?alt=media&token=c81554f5-3809-4a70-b2ee-5ec3c78aef1f"
      />
    </div>
  )

  function handleOnClick(e, index) {
    setClick(!clicked)
    setCurrentPlace({
      name: companies[index].companyname,
      address: companies[index].address,
      phone: companies[index].phone,
      city: companies[index].city,
      state: companies[index].state,
      zip: companies[index].zip,
      hhdays: companies[index].hhdays,
      starthour: companies[index].starthour,
      endhour: companies[index].endhour,
      website: companies[index].website
    })
  }

  return (
    // Important! Always set the container height explicitly
    <div className="mapContainer1">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyB1pDrrZwaiz8ZsVU7N3UCSXvfPU4iTgHE",
          // key:"AIzaSyCDavrh1NwCNrAAw8DyMi21XpGTrfQCslk",
          libraries: ["places", "directions"]
        }}
        defaultCenter={{ lat: 36.16, lng: -115.15 }}
        // center={(coordinates, { lat: 36.16, lng: -115.15 })} // new code for go location
        center={coordinates} // old code for go location
        defaultZoom={15}
      >
        {companies.map((p, i) => (
          <AnyReactComponent
            key={i}
            lat={Number(p.lat)}
            lng={Number(p.lng)}
            showballon={true}
            text={i}
          />
        ))}

        {clicked ? (
          <div className="showpindesc">
            <div className="cardImg">
              <img src="https://cdn.pixabay.com/photo/2017/12/29/16/58/background-3048067_960_720.jpg" />
            </div>

            <div className="cardName">
              <h2>{currentPlace.name}</h2>
              <p>
                <span className="cardBold"> Address: </span>
                {currentPlace.address}, {currentPlace.city},{" "}
                {currentPlace.state} - {currentPlace.zip}
              </p>
              <p>
                <span className="cardBold"> Phone: </span>
                {currentPlace.phone}
              </p>
              <p>
                <span className="cardBold"> Happy hour days: </span>{" "}
                {currentPlace.hhdays}
              </p>
              <p>
                <span className="cardBold"> From: </span>{" "}
                {currentPlace.starthour >= 12
                  ? currentPlace.starthour == 12
                    ? currentPlace.starthour + "pm"
                    : currentPlace.starthour - 12 + "pm"
                  : currentPlace.starthour + "am"}{" "}
                to{" "}
                {currentPlace.endhour >= 12
                  ? currentPlace.endhour == 12
                    ? currentPlace.endhour + "pm"
                    : currentPlace.endhour - 12 + "pm"
                  : currentPlace.endhour + "am"}
              </p>
              <p>
                <span className="cardBold"> Website: </span>
                <a href={currentPlace.website}>{currentPlace.name}</a>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </GoogleMapReact>
    </div>
  )
}
