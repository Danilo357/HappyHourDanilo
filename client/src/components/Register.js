import React, { useState} from 'react'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom'
import { useAdmins } from '../hooks'
import Footer from "./Footer";
import "../styles/Registration.css"
import validator from "validator"
import Icon from "../lib/Icon";

export default props => {
const [username, setUsername]=useState('')
const [password, setPassword]=useState('')
const [contactName, setContactName]=useState('')
const [cpassword, setCPassword]=useState('')
const [email, setEmail]=useState('')
const [phonenumber, setPhone]=useState('')

//validation
const [userExists, setUserExists]=useState(false)
const [passError, setPassError]=useState(false)
const [emailError, setEmailError]=useState(false)
const [phoneError, setPhoneError]=useState(false)
const [descError, setDescError]=useState('')
let error = false
const [iserror, setisanError]=useState(false)
const { getRegistered } = useAdmins ()
const { reg } = useAuth()
const {admins } = useAdmins()

function handlesubmit(e){
    e.preventDefault()
    

if(username=="" || password=="" || contactName=="" || password=="" || cpassword=="" || email==""){ 
    setDescError("All fields required") 
    setisanError(true)
    error=true

    } 
else { 
    setisanError(false)
    if (admins.filter(u=>u.username == username).length>0) { 
        setDescError("User already exists")
        setUsername('')
         setUserExists(true)  
         setPassError(false) 
         setEmailError(false) 
         setPhoneError(false) 
        error=true
    } else if (!validator.isNumeric(phonenumber))
        { 
            setDescError("only numbers allowed") 
            setPhone('')
            setPhoneError(true) 
            setEmailError(false) 
            setUserExists(false)
            setPassError(false) 
            error=true
    } else if (!validator.isEmail(email))
        { 
         setDescError("Must enter a valid email") 
         setEmail('')
         setEmailError(true) 
         setUserExists(false)
         setPassError(false) 
         setPhoneError(false)
         error=true
    } else if (password !== cpassword)
        {
        setDescError("passwords do not match")
        setPassword('')
        setCPassword('')
        setPassError(true) 
        setEmailError(false) 
        setUserExists(false)
        setPhoneError(false) 
        error=true
    } else{ 
        setUserExists(false) 
        setPassError(false) 
        setEmailError(false)

 }

 }
 
if (!error){
    
            reg(username,password,contactName,phonenumber,email) //after signin we want to redirect to another page
            .then((resp)=>{
                getRegistered([ //to display on the profile component
                    {
                        username,
                        name: contactName,
                        email,
                        phone: phonenumber,
                        justRegistered: "r"
                    }]
                )

                props.history.push("/profile")

            }) 
            .catch(e => {
                console.log("LOGIN ERROR")
            })

        // needs to be a promise because if not it will redirect before everything is done.
        //the "/" takes us to "*" in app.js that take us to checklogin. this check if it's authenticated shows profile if not, redirect to login
}

}

    return (
        <>
            <div className="regMainContainer">
                <div className="regWrapper">
                    <div className="regLeftSide">
                        <div className="regLogo">HHFindr.com</div>
                    </div>
                    <div className="regRightSide">
                    <div className="regHouseContainer">
                        <Link className="regHouse" to={'/'}><Icon icon="home"/></Link>
                    </div>
                        <form className="regForm" onSubmit={handlesubmit}>
                            <p className="regPleaseSignIn">Partner Registration</p>
                            <input className={userExists || iserror ? "redstar" : ""} type="text" name ="username" placeholder= "Username" value={username} onChange={e=>setUsername(e.target.value)}/>   
                            <input className ={iserror ? "redstar" : ""} type="text" name = "contactname" placeholder="Contact name" value={contactName} onChange={e=>setContactName(e.target.value)}/>
                            <input className ={iserror || phoneError ? "redstar" : ""} type="text" name ="phonenumber" placeholder="Phone Number" value={phonenumber} onChange={e=>setPhone(e.target.value)}/>
                            <input className ={emailError || iserror ? "redstar" : ""} type="email" name ="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                            <input className={passError || iserror ? "redstar" : ""} type="password" name = "password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                            <input className={passError || iserror ? "redstar" : ""} type="password" name = "cpassword" placeholder="Confirm Password" value={cpassword} onChange={e=>setCPassword(e.target.value)}/>
                            <div className="regBottom">
                                <button className="regButton" type="submit">Sign Up</button>
                                <div className="regBottomRight">
                                    <p className="regToLogin"><Link to="/login">Log In</Link></p>
                                </div>
                            </div>
                            <div className="regRegistrationValidation">
                                {descError!=""?
                                <p className="regValText"> {descError}</p>: ""}
                                <div className="regSpaceHolder"></div>
                                <p className="regToTheOtherFormText">Already registered?</p>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}