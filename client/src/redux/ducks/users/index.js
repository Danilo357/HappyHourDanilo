import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

// action definitions
const GET_DATA = "users/GET_PICTURES"
// initial state
const initialState = {
  users: []
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

// action creators
const getData = () => {
  return dispatch => {
    axios.get("/companies").then(resp => {
      dispatch({
        type: GET_DATA,
        payload: resp.data
      })
    })
  }
}

function sendFeedback(message, email, name) {
  return dispatch => {
    axios.post("/feedback", { message, email, name }).then(resp => {})
  }
}

function sendSubscrib(email) {
  return dispatch => {
    axios.post("/subscribers", { email }).then(resp => {})
  }
}


// custom hooks

export function useUsers() {
  const users = useSelector(appState => appState.userState.users)
  const dispatch = useDispatch()
  const get = () => dispatch(getData())
  const sendF = (message, email, name) => {
    return dispatch(sendFeedback(message, email, name))
  }

  const sendSubs = email => {
    return dispatch(sendSubscrib(email))
  }

  useEffect(() => {
    get()
  }, [dispatch])

  return { users, sendF, sendSubs }
}

