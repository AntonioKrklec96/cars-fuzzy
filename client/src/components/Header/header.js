import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import Nav from "./Sidenav/sidenav";

function Header(props) {
  let [showNav, setShowNav] = useState(false);

  let onHideNav = () => {
    setShowNav(false);
  };

  return (
    <header>
      <div className="open_nav">
        <FontAwesome
          name="bars"
          onClick={() => setShowNav(true)}
          style={{
            color: "white",
            padding: "10px",
            cursor: "pointer",
          }}
        />
      </div>
      <Nav showNav={showNav} onHideNav={() => onHideNav()} />
      <Link to="/" className="logo">
        CAR SEARCH APP
      </Link>
    </header>
  );
}

export default Header;
