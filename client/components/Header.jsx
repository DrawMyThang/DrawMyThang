import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

class Header extends Component {
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">DRAW THIS THANG</div>
          {this.props.authenticated
            ? <input className="pt-input" placeholder="Search..." type="text" />
            : null
          }          
        </div>
        {
          this.props.authenticated
          ? (
            <div className="pt-navbar-group pt-align-right">
              <Link className="pt-button pt-minimal pt-icon-music" to="/songs">Songs</Link>
              <span className="pt-navbar-divider"></span>
              <button className="pt-button pt-minimal pt-icon-user"></button>
              <button className="pt-button pt-minimal pt-icon-cog"></button>
            </div>
          )
            : (
              <div className="pt-navbar-group pt-align-right">
                <Link className="pt-button pt-intent-primary" to="/login">Register/Log In</Link>
              </div>
            )
        }   
      </nav>
    );
  }
}

export default Header;