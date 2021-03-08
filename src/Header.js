import React from "react"
import logo from './stadilogo.png';
import './Header.css';

function Header(){
    return (
        <div>
          <header className="header">
            <img src={logo} className="Header-logo" alt="logo" />
          </header>
        </div>
      );
}

export default Header