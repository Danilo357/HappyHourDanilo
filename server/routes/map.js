const router = require("express").Router()
const axios = require("axios")
const db = require("../db")

router.post("/coordinates", (req, res, next) => {
  axios
    .post(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB1pDrrZwaiz8ZsVU7N3UCSXvfPU4iTgHE"
    )
    .then(resp => {
      // axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCDavrh1NwCNrAAw8DyMi21XpGTrfQCslk').then(resp =>{
      //grabing the coordinates from the api. only post      //
      const coord = resp.data.location
      res.json(coord)
    })
})

router.put("/places/:name", (req, res, next) => {
  const companyname = req.params.name
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${companyname}&key=AIzaSyB1pDrrZwaiz8ZsVU7N3UCSXvfPU4iTgHE`
    )
    .then(resp => {
      // axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${companyname}&key=AIzaSyCDavrh1NwCNrAAw8DyMi21XpGTrfQCslk`).then(resp =>{
      res.json(resp.data.results[0].geometry.location)
      const sql = `UPDATE companies set lat = ?, lng=? WHERE companyname=?`
      db.query(
        sql,
        [
          resp.data.results[0].geometry.location.lat,
          resp.data.results[0].geometry.location.lng,
          companyname
        ],
        (err, results, fields) => {}
      )
    })
})

module.exports = router
