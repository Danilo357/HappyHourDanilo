import React, { useState} from 'react'
import { useAdmins} from '../hooks'
import {useCompanies} from "../hooks"
import "../styles/Profile.css"
import { Link } from 'react-router-dom'
import Icon from "../lib/Icon";
import Footer from "./Footer";
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
import config from './FbConfig'
import validator from "validator"

firebase.initializeApp(config)

export default props => {

    const {admins, oneAdmin} = useAdmins()
    const { companies, regProf, getLoc, } = useCompanies()
    const [username, setUsername]=useState(oneAdmin.map(u=>u.username).toString())
    let admin_id=Number(oneAdmin.map(u=>u.id).join(''))
    let lastAdminId = Number(admins[admins.length -1].id)
    let fromRegForm=oneAdmin.map(u=>u.justRegistered)
    const thecompany = companies.filter(f=>f.admin_id==admin_id)
    const dd=thecompany.map(c =>c.hhdays).join()
    const ddarr=dd.split(",")
    const [contactName, setContactName]=useState(oneAdmin.map(u=>u.name).toString())
    const [email, setEmail]=useState(oneAdmin.map(u=>u.email).toString())
    const [phonenumber, setPhone]=useState(oneAdmin.map(u=>u.phone).toString())
    const [compName,setCompName]=useState(thecompany.map(c=>c.companyname).join())
    const [address,setAddress]=useState(thecompany.map(c=>c.address).join())
    const [usstate, setUsState]=useState(thecompany.map(c=>c.state).join())
    const [city,setCity]=useState(thecompany.map(c=>c.city).join())
    const [zip, setZip]=useState(thecompany.map(c=>c.zip).join())
    const [lat, setLat]=useState(thecompany.map(c=>c.lat).join())
    const [lng, setLng]=useState(thecompany.map(c=>c.lng).join())
    const [compEmail, setCompEmail]=useState(thecompany.map(c=>c.email).join())
    const [compPhone, setCompPhone]=useState(thecompany.map(c=>c.phone).join())
    const [compWeb,setCompWeb]=useState(thecompany.map(c=>c.website).join())
    const [fb, setFb]=useState(thecompany.map(c=>c.facebook).join())
    const [ig,setIg]=useState(thecompany.map(c=>c.instagram).join())
    const [tw,setTw]=useState(thecompany.map(c=>c.twitter).join())

    const [foodType, setFoodType]=useState(thecompany.map(c=>c.foodtype).join())
    const [pic,setPic]=useState(thecompany.map(c=>c.picture).join())
    const [desc, setDesc]=useState(thecompany.map(c=>c.descrip).join())
    const [menu, setMenu]=useState(thecompany.map(c=>c.menu).join())
    const [startHr, setStartHr]=useState(thecompany.map(c=>c.starthour).join())
    const [endHr, setEndHr]=useState(thecompany.map(c=>c.endhour).join())

    const [localUrl, setLocalUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const [monday, setMonday]=useState(ddarr.includes("Mo")?true:false)
    const [tuesday, setTuesday]=useState(ddarr.includes("Tu")?true:false) 
    const [wed, setWed]=useState(ddarr.includes("We")?true:false) 
    const [thurs, setThurs]=useState(ddarr.includes("Th")?true:false) 
    const [fri, setFri]=useState(ddarr.includes("Fr")?true:false) 
    const [sat, setSat]=useState(ddarr.includes("Sa")?true:false) 
    const [sun, setSun]=useState(ddarr.includes("Su")?true:false) 

    const [emailError, setEmailError]=useState(false)
    const [descError, setDescError]=useState('')
    let error = false
    const [iserror, setisanError]=useState(false)
    const [isAnumber, setIsAnumber]=useState(false)
    const [isPhoneError, setIsPhoneError]=useState(false)
    const [days, setDays]=useState(true)

    function handleUploadStart(filename) {
        setIsUploading(true)
    }

    function handleProgress(progress) {
    }

    function handleUploadError(error) {
        setIsUploading(false)
    }


    function handleUploadSuccess(filename,e) {
        setLocalUrl('')
        setIsUploading(false)
        firebase
            .storage()
            .ref("flyers")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                setPic(url)
            })
    }
        
        
    function handlesubmit(e){
        e.preventDefault()
        let days = []

        if (monday)
            {days.push("Mo")}
        if (tuesday)
        {days.push("Tu")}
        if (wed)
        {days.push("We")}
        if(thurs)
        {days.push("Th")}
        if(fri)
        {days.push("Fr")}
        if (sat)
        {days.push("Sa")}
        if (sun)
        {days.push("Su")}
        const d=days.join(',')     


        if (fromRegForm && fromRegForm.join()==="r")
        {
            admin_id=lastAdminId
            lastAdminId=0
            fromRegForm="r"
        }else {
            if (!thecompany.length){
                fromRegForm="r"
            }
        }


        if(compName==="" || address==="" || usstate==="" || city==="" || zip==="" || compEmail==="" || compWeb==="" || compPhone ==="" || d==="" || pic==="" || startHr==="" || endHr==="" || !foodType){ 
            setDescError("Please check required fields") 
            setisanError(true)
            setDays(d==="" ? false : true)
            error=true
            } 
        else { 
                setisanError(false)
                if (!validator.isNumeric(zip)) { 
                    setDescError("Only Numbers allowed") 
                    setZip('')
                    setEmailError(false) 
                    setIsAnumber(true) 
                    setIsPhoneError(false)
                    error=true
                }else if(!validator.isNumeric(compPhone))
                {
                    setDescError("Only Numbers allowed") 
                    setCompPhone('')
                    setEmailError(false) 
                    setIsAnumber(false) 
                    setIsPhoneError(true)
                    error=true

                }else if (!validator.isEmail(compEmail))
                    { 
                    setDescError("Must be a valid email") 
                    setCompEmail('')
                    setEmailError(true) 
                    setIsAnumber(false) 
                    setIsPhoneError(false)
                    error=true
                } else{ 
                    setEmailError(false) 
                    setIsAnumber(false) 
                    setIsPhoneError(false)

                }

        }

    if (!error){

            regProf(username,compName, address, city, usstate, zip, compPhone, compEmail, compWeb, fb, ig, tw, lat, lng, pic, foodType, menu, desc, d, startHr, endHr, admin_id, fromRegForm ) //after signin we want to redirect to another page
                .then((resp)=>{
                    //update the coordinates
                    getLoc(compName).then(() => {
                    console.log("coordinates updated")
                        })
                    props.history.push("/")
            
                }) 
                .catch(e => {
                    console.log(e + " ERROR")
                })
        }     
        

    }
        
            
    return (
        <>
        <div className="ProfloginHouseContainerP">
            <Link className="loginHouseP" to={'/'}><Icon icon="home"/></Link>
        </div>
                    
        <div className="prof">
            <h1> Welcome, {username}</h1> 
            <form onSubmit={handlesubmit}>
                <div className="profInputs">
                        <div id="profileLeft">
                            <div className="personalContactInputs">
                                <input type="text" name ="username" placeholder="Username" value={username} disabled/>
                                <input  type="text" name = "contactname" placeholder="Contact name" value={contactName} disabled />
                                <input type="text" name ="phonenumber" placeholder="Phone Number" value={phonenumber} disabled />
                                <input type="text" name ="email" placeholder="email" value={email} disabled />
                            </div>
                            <div className="uploadImgsection">
                                <label className={iserror ? "fred file" : "file"}>
                                    Select an image
                                    <FileUploader 
                                        hidden
                                        accept="image/*"
                                        name="happy"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("flyers")}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                        value={localUrl}                    
                                    />
                                </label>    
                                <img alt="" className="thumbpics" src={pic}/>
                            </div>
                        </div>
                        <div id="right">
                                <div id="rightTop">
                                    <div className="loactioninputs">
                                    <input className={compName==="" ? "red" : ""}  type="text" name = "companyname" placeholder="Company name" value={compName} onChange={e=>setCompName(e.target.value)} tabIndex="1" autoFocus/>
                                    <input className={address==="" ? "red" : ""}  type="text" name = "address" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} tabIndex="2"/>
                                    <select className={usstate==="" ? "st red" : "st"} onChange={e => setUsState(e.target.value)} tabIndex="3" value={usstate} >
                                        <option value="default"> Select</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    <input className={city==="" ? "red" : ""} type="text" name = "city" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} tabIndex="4"/>
                                    <input className={zip==="" || isAnumber ? "red" : ""} type="text" name = "zip" placeholder="Zip code" value={zip} onChange={e=>setZip(e.target.value)} tabIndex="5"/>
                                    <textarea type="text" name="menu" placeholder="Menu" value={menu} onChange={e=>setMenu(e.target.value)} tabIndex="14"/>
                                </div>
        
                                <div className="contactinputs">
                                    <input className={compEmail==="" || emailError ? "red" : ""} type="email" name ="companyemail" placeholder="Company email" value={compEmail} onChange={e=>setCompEmail(e.target.value)} tabIndex="7"/>
                                    <input className={compPhone==="" || isPhoneError ? "red" : ""} type="tel" name ="phone" placeholder="Company phone" value={compPhone} onChange={e=>setCompPhone(e.target.value)} tabIndex="8"/>
                                    <input className={compWeb==="" ? "red" : ""} type="url" name ="website" placeholder="Company website" value={compWeb} onChange={e=>setCompWeb(e.target.value) } tabIndex="9"/>
                                    <input type="url" name ="fb" placeholder="Company Facebook" value={fb} onChange={e=>setFb(e.target.value)} tabIndex="10"/>
                                    <input type="url" name ="ig" placeholder="Company Instagram" value={ig} onChange={e=>setIg(e.target.value)} tabIndex="11"/>
                                    <input type="url" name ="tw" placeholder="Company Twitter" value={tw} onChange={e=>setTw(e.target.value)} tabIndex="12"/>
                                    <textarea type="text" name="desc" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}tabIndex="13"/>
                                </div>
                                </div>
                                <div className="middleBottom">
                                    <div className="dayshr">
                                        <div className="happydays">
                                            <label className={!days ? "hred" : ""}> Mo
                                                <input type="checkbox" value={monday} checked={monday} onChange={e=>setMonday(!monday)} tabIndex="15"/>                      
                                            </label >
                                            <label className={!days ? "hred" : ""}> Tu
                                                <input type="checkbox" value={tuesday} checked={tuesday} onChange={e=>setTuesday(!tuesday)} tabIndex="16"/>                      
                                            </label>
                                            <label className={!days?"hred" : ""}> We
                                                <input type="checkbox" value={wed} checked={wed} onChange={e=>setWed(!wed)} tabIndex="17"/>                      
                                            </label >
                                            <label className={!days ?"hred" : ""}> Th
                                                <input type="checkbox" value={thurs} checked={thurs} onChange={e=>setThurs(!thurs)} tabIndex="18"/>                      
                                            </label>
                                            <label className={!days ? "hred" : ""}> Fr
                                                <input type="checkbox" value={fri} checked={fri} onChange={e=>setFri(!fri)} tabIndex="19"/>                      
                                            </label>
                                            <label className={!days ? "hred" : ""}> Sa
                                                <input type="checkbox" value={sat} checked={sat} onChange={e=>setSat(!sat)} tabIndex="20"/>                      
                                            </label>
                                            <label className={!days ? "hred" : ""}> Su
                                                <input type="checkbox" name="sun" value={sun} checked={sun} onChange={e=>setSun(!sun)} tabIndex="21"/>                      
                                            </label>
                                        </div>
                                        <div className="hr">
                                            <select className={startHr==="" ? "sd red" : "sd"} onChange={e => setStartHr(e.target.value)} tabIndex="22" value={startHr} >
                                                <option value="default"> Select</option>
                                                <option value="00">12:00 am</option>
                                                <option value="01">01:00 am</option>
                                                <option value="02">02:00 am</option>
                                                <option value="03">03:00 am</option>
                                                <option value="04">04:00 am</option>
                                                <option value="05">05:00 am</option>
                                                <option value="06">06:00 am</option>
                                                <option value="07">07:00 am</option>
                                                <option value="08">08:00 am</option>
                                                <option value="09">09:00 am</option>
                                                <option value="10">10:00 am</option>
                                                <option value="11">11:00 am</option>
                                                <option value="12">12:00 pm</option>
                                                <option value="13">01:00 pm</option>
                                                <option value="14">02:00 pm</option>
                                                <option value="15">03:00 pm</option>
                                                <option value="16">04:00 pm</option>
                                                <option value="17">05:00 pm</option>
                                                <option value="18">06:00 pm</option>
                                                <option value="19">07:00 pm</option>
                                                <option value="20">08:00 pm</option>
                                                <option value="21">09:00 pm</option>
                                                <option value="22">10:00 pm</option>
                                                <option value="23">11:00 pm</option> 
                                                </select>
                                            <select className={endHr==="" ? "sd red" : "sd"} onChange={e => setEndHr(e.target.value)} tabIndex="23" value={endHr} >
                                                <option value="default"> Select</option>
                                                <option value="00">12:00 am</option>
                                                <option value="01">01:00 am</option>
                                                <option value="02">02:00 am</option>
                                                <option value="03">03:00 am</option>
                                                <option value="04">04:00 am</option>
                                                <option value="05">05:00 am</option>
                                                <option value="06">06:00 am</option>
                                                <option value="07">07:00 am</option>
                                                <option value="08">08:00 am</option>
                                                <option value="09">09:00 am</option>
                                                <option value="10">10:00 am</option>
                                                <option value="11">11:00 am</option>
                                                <option value="12">12:00 pm</option>
                                                <option value="13">01:00 pm</option>
                                                <option value="14">02:00 pm</option>
                                                <option value="15">03:00 pm</option>
                                                <option value="16">04:00 pm</option>
                                                <option value="17">05:00 pm</option>
                                                <option value="18">06:00 pm</option>
                                                <option value="19">07:00 pm</option>
                                                <option value="20">08:00 pm</option>
                                                <option value="21">09:00 pm</option>
                                                <option value="22">10:00 pm</option>
                                                <option value="23">11:00 pm</option> 
                                                </select>
                                        </div>
                                </div>    
                                        <select className={foodType==="" ? "st red" : "st"} onChange={e => setFoodType(e.target.value)} tabIndex="23" value={foodType} >
                                            <option value="foodtype"> Select</option>
                                            <option value="American">American</option>
                                            <option value="Mexican">Mexican</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Thai">Thai</option>
                                            <option value="Vietnamese">Vietnamese</option>
                                            <option value="Korean">Korean</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Mediterranean">Mediterranean</option>
                                            <option value="Italian">Italian</option>
                                        </select>

                                        <div className="buttons">
                                                <button type="submit">Update profile</button>
                                                {iserror || isAnumber || emailError? 
                                            <p className="hred norev">{descError}</p>
                                            : "" }

                                        </div>
                                </div>
                        </div> 

                    </div>
            

                
            </form>

        </div>
        <Footer/>

    </>
    ) 


}