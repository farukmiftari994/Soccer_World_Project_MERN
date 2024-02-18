// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function SiteMenu({ children }: { children: React.ReactNode }): JSX.Element {
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/createPlayer",
      name: "Add Player",
    },
    {
      path: "/playerCards",
      name: "All Players",
    },
    {
      path: "/create",
      name: "Create",
    },
  ];
  return (
    <div className="containers">
      <div className="siteMenu">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SiteMenu;
