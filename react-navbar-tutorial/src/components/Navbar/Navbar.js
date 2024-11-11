import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { FaReact, FaBars, FaTimes   } from "react-icons/fa";
import './Navbar.css';
import Button from "../Button";
class Navbar extends Component {
    state  = {clicked:false}

    handleClick = () => {
        this.setState({clicked:!this.state.clicked});
    }
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">React <FaReact className="fab fa-react"/></h1>
        <div className="menu-icon" onClick={this.handleClick}>
            {
                this.state.clicked ?  <FaTimes className="fas fa-times"/> : <FaBars className="fas fa-bars"/>
            }
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <Button>Sign Up</Button>
      </nav>
    );
  }
}
export default Navbar;
