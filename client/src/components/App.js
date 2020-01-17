import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"
import Main from "./Main"
import CheckLogin from "./CheckLogin"
import Register from "./Register"
import AboutUs from "./AboutUs"
import PartnerWithUs from "./PartnerWithUs"
import SingleViewPage from "./SingleViewPage"

function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Main} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/PartnerWithUs" component={PartnerWithUs} />
          <Route path="/SingleViewPage/:id" component={SingleViewPage} />
          <Route path="*" component={CheckLogin} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
