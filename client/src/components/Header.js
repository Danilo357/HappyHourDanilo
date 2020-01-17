import React from "react";
import "../styles/Header.css";
import Icon from "../lib/Icon";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="headerContainer">
      <header>
        <Link className="headerHouse" to={'/'}><Icon icon="home"/></Link>
        <div className="topRight"></div>
      </header>
    </div>
  )
}
export default Header
