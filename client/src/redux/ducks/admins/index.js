import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

// action definitions
const GET_ADMINS = "users/GET_ADMINS"
const GET_ONEADMIN = "users/GET_ONEADMIN"
const GET_REGISTERED = "users/GET_REGISTERED"

// initial state
const initialState = {
  admins: [],
  oneAdmin: [],
  profile:{}

}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS:
      return { ...state, admins: action.payload }
    case GET_ONEADMIN:
      return {...state, oneAdmin:state.admins.filter(e=>e.username == action.payload)}
    case GET_REGISTERED:
      return {...state, oneAdmin:action.payload}
    default:
      return state
  }
}

// action creators
const getAdmins = () => {
  return dispatch => {
    axios.get("/admins").then(resp => {
      dispatch({
        type: GET_ADMINS,
        payload: resp.data
      })
    })
  }
}




const getOneAdmin = (user)=>{

  return dispatch => {

    dispatch ({
      type:GET_ONEADMIN,
      payload:user
    })
  }
}



const getJustRegistered = (registered)=>{

  return dispatch => {

    dispatch ({
      type:GET_REGISTERED,
      payload:registered
    })
  }
}




// custom hooks
export function useAdmins() {
  const admins = useSelector(appState => appState.adminState.admins)
  const oneAdmin = useSelector(appState => appState.adminState.oneAdmin)

  const dispatch = useDispatch()
  const getone = user=>dispatch(getOneAdmin(user))
const getRegistered = registered => dispatch(getJustRegistered(registered))

  useEffect(() => {
    dispatch(getAdmins())
  }, [dispatch])

  return { admins, getone, oneAdmin, getRegistered }
}
