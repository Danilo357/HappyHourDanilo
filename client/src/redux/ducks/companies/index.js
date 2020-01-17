import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

// action definitions
const GET_COMPANIES = "users/GET_COMPANIES"
const GET_ONECOMPANY = "users/GET_ONECOMPANY"
const GET_PLACE = "users/GET_PLACE"

// initial state
const initialState = {
  companies: [],
oneCompany:'',
lat:0,
lng:0

}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return { ...state, companies: action.payload }
    case GET_ONECOMPANY:
            return {...state, oneCompany:action.payload}
    case GET_PLACE:
            return { ...state, lat: action.lat, lng:action.lng }
       default:
      return state
  }
}

// action creators
const getCompanies = () => {
  return dispatch => {
    axios.get("/gprofile").then(resp => {
      dispatch({
        type: GET_COMPANIES,
        payload: resp.data
      })
    })
  }
}




const getOneCompany = (companyname)=>{
  return dispatch => {

    dispatch ({
      type:GET_ONECOMPANY,
      payload:companyname
    })

  }
}



const getPlace = (name, dispatch) => {
  return new Promise((resolve, reject) => {
    axios.put(`/map/places/${name}`).then(resp => {
      dispatch({
        type: GET_PLACE,
        lat: resp.data.lat,
        lng:resp.data.lng
      })
      resolve()

    }).catch(e=>{
      console.log("didn't find the place")
      reject()
    })
  })
}



//update profile

function regProfile(username, companyname, address, city, state, zip, phone, email, website, facebook, instagram, twitter, lat, lng, picture, foodtype, menu, description, hhdays, starthour, endhour, admin_id, fromRegForm) {
if (fromRegForm=="r")
{
//company does not exists
    return new Promise((resolve, reject) => {
        axios
            .post("/profile", {username, companyname, address, city, state, zip, phone, email, website, facebook, instagram, twitter, lat, lng, picture, foodtype, menu, description, hhdays, starthour, endhour, admin_id })
            .then(resp => {

                   resolve()  
                

            })
            .catch(e => {
                reject()
            })
         })

}else{

    return new Promise((resolve, reject) => {

                axios
                    .put("/gprofile", {username, companyname, address, city, state, zip, phone, email, website, facebook, instagram, twitter, lat, lng, picture, foodtype, menu, description, hhdays, starthour, endhour, admin_id })
                    .then(resp => {
                        resolve()    
                    })
                    .catch(e => {
                        reject()
                    })
            })
    }
    
}




// custom hooks
export function useCompanies() {
  const companies = useSelector(appState => appState.companyState.companies)
  const oneCompany = useSelector(appState => appState.companyState.oneCompany)
  const dispatch = useDispatch()
  const getOneC = companyname=>dispatch(getOneCompany(companyname))
  const getLoc = (name) => getPlace(name, dispatch)
  const regProf = (username,companyname, address, city, state, zip, phone, email, website, facebook, instagram, twitter, lat, lng, picture, foodtype, menu, description, hhdays, starthour, endhour, admin_id, fromRegForm) => {
  return regProfile(username,companyname, address, city, state, zip, phone, email, website, facebook, instagram, twitter, lat, lng, picture, foodtype, menu, description, hhdays, starthour, endhour, admin_id, fromRegForm)
  }

  useEffect(() => {
    dispatch(getCompanies())
  }, [])

  return { companies, oneCompany, regProf, getOneC, getLoc }
}