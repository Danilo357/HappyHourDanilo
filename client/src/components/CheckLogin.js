import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks'
import Profile from "./Profile"


//check if is authentic.. and if is not, will redirect to login
export default props => {
const { isAuthenticated } = useAuth()
return isAuthenticated ? ( 
    <Route path="/profile" component={Profile}/>
    

): (
    <Redirect to="/login" />
)

}