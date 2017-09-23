import React from 'react';
import { Link } from 'react-router-dom';
// import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

class Header extends React.Component {
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pat-navbar-group pt-align-left">
          <div className="pt-navbar-heading">DRAW THIS THANG</div>
          <input className="pt-input" placeholder="Search..." type="text" />
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Link className="pt-button pt-minimal pt-icon-music" to="/songs">Songs</Link>
          <span className="pt-navbar-divider"></span>
          <button className="pt-button pt-minimal pt-icon-user"></button>
          <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
      </nav>
    );
  }
}

export default Header;