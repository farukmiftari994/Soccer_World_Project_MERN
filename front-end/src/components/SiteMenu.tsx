import { NavLink } from "react-router-dom";
import "../App.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function SiteMenu({ children }: { children: React.ReactNode }): JSX.Element {
  const { user } = useContext(AuthContext);
  //? SiteMenu: A functional React component that takes children as a prop. This allows other components or elements to be nested within SiteMenu.
  //? children: This prop is used to render any nested elements or components within SiteMenu.

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <div className="siteMenu">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`menu-items ${isOpen ? "open" : ""}`}>
          {menuItem.map((item, index) => {
            if (item.restricted && user?.role !== "admin") return null;
            return (
              <NavLink to={item.path} key={index} className="link">
                <div className="link_text">{item.name}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SiteMenu;
