import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

import axios from 'axios'
// action definitions
const GET_LATLONG = "map/GET_LATLONG"
const GET_PLACE = "map/GET_PLACES"
const initialState = {
    coordinates:{},
    lat:0,
    lng:0

   }
// reducer(s)
export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LATLONG:
            return { ...state, coordinates: action.payload }
        case GET_PLACE:
        return { ...state, lat: action.lat, lng:action.lng }
        default:
            return state
    }
}
// actions
const getCoordinates = () => {
    return dispatch => {
      axios.post("/map/coordinates").then(resp => {
        dispatch({
          type: GET_LATLONG,
          payload: resp.data
        })
      })
    }
  }



export function useMaps() {
    const dispatch = useDispatch()
    const coordinates = useSelector(appState => appState.mapState.coordinates)
    useEffect(() => {
        dispatch(getCoordinates())
      }, [dispatch])
    return { coordinates }
}