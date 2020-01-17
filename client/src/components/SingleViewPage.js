import React from "react"
import { useCompanies } from "../hooks"
import GoogleMapReact from "google-map-react"

// import internal links
import Header from "./Header"
import Footer from "./Footer"
// import stylesheet
import "../styles/SingleViewPage.css"

export default props => {
  const { companies } = useCompanies()
  const compId = props.match.params.id
  const thecompany = companies.filter(e => e.id == compId)
  if (thecompany.length === 0) {
    return <></>
  } else {
    const AnyReactComponent = ({ text }) => (
      <div className="pinContainer">
        <img
          alt=""
          className="pinImg"
          src="https://firebasestorage.googleapis.com/v0/b/happy-717c5.appspot.com/o/flyers%2F79cbf552-d272-4c39-b0ba-d1ebb4e1c74b.png?alt=media&token=c81554f5-3809-4a70-b2ee-5ec3c78aef1f"
        />
      </div>
    )

    return (
      <>
        <Header />
        <div className="svpMainContainer">
          <div className="svpLeftSide">
            <div className="svpInfo">
              <h1>{thecompany[0].companyname}</h1>
              {thecompany[0].descrip != "" ? (
                <p> {thecompany[0].descrip}</p>
              ) : (
                ""
              )}
              <p>
                {" "}
                <span className="boldP">Email: </span> {thecompany[0].email}
              </p>
              <p>
                {" "}
                <span className="boldP">Phone Number: </span>{" "}
                {thecompany[0].phone}
              </p>
              <p>
                {" "}
                <span className="boldP">Web: </span>
                <a href={thecompany[0].website} target="blank">
                  {thecompany[0].companyname}
                </a>{" "}
              </p>
              <p>
                {" "}
                <span className="boldP">Happy hour days: </span>{" "}
                {thecompany[0].hhdays}
              </p>
              <p>
                {" "}
                <span className="boldP">From </span>{" "}
                {thecompany[0].starthour >= 12
                  ? thecompany[0].starthour == 12
                    ? thecompany[0].starthour + "pm"
                    : thecompany[0].starthour - 12 + "pm"
                  : thecompany[0].starthour + "am"}{" "}
                <span className="boldP">to</span>{" "}
                {thecompany[0].endhour >= 12
                  ? thecompany[0].endhour == 12
                    ? thecompany[0].endhour + "pm"
                    : thecompany[0].endhour - 12 + "pm"
                  : thecompany[0].endhour + "am"}
              </p>
              <p>
                {" "}
                <span className="boldP">Address: </span> {thecompany[0].address}
              </p>
            </div>
          </div>
          <div className="middleLeftsvp">
            <div className="mapContainer">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyB1pDrrZwaiz8ZsVU7N3UCSXvfPU4iTgHE",
                  // key:"AIzaSyCDavrh1NwCNrAAw8DyMi21XpGTrfQCslk",
                  libraries: ["places", "directions"]
                }}
                defaultCenter={{ lat: 36.16, lng: -115.15 }}
                center={{
                  lat: Number(Number(thecompany[0].lat).toFixed(2)),
                  lng: Number(Number(thecompany[0].lng).toFixed(2))
                }}
                defaultZoom={15.4}
              >
                <AnyReactComponent
                  key={""}
                  lat={Number(thecompany[0].lat)}
                  lng={Number(thecompany[0].lng)}
                  showballon={true}
                  text={""}
                />
              </GoogleMapReact>
            </div>
          </div>
          <div className="svpRightSide">
            <img className="svpImg" src={thecompany[0].picture} />
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
