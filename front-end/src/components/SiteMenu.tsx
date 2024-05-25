// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function SiteMenu({ children }: { children: React.ReactNode }): JSX.Element {
  const { user } = useContext(AuthContext);

  const menuItem = [
    {
      path: "/",
      name: "Home",
      restricted: false,
    },
    {
      path: "/about",
      name: "About",
      restricted: false,
    },
    {
      path: "/addPlayer",
      name: "Add Player",
      restricted: true,
    },
    {
      path: "/updatePlayers",
      name: "Update Players",
      restricted: true,
    },
    {
      path: "/allPlayers",
      name: "All Players",
      restricted: false,
    },
    {
      path: "/createCard",
      name: "Create Card",
      restricted: false,
    },
  ];
  return (
    <div>
      <div className="siteMenu ">
        {menuItem.map((item, index) => {
          // console.log("maping sitemenu");
          if (item.restricted && user?.role !== "admin") return;
          else {
            return (
              <NavLink to={item.path} key={index} className="link">
                <div className="link_text">{item.name}</div>
              </NavLink>
            );
          }
        })}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SiteMenu;
