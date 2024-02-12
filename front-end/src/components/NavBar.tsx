import Nav from "react-bootstrap/Nav";
import { Button, Dropdown, DropdownButton, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar(): JSX.Element {
  const loginLogout = [{ path: "/user" }];
  const { user, logout } = useContext(AuthContext);
  console.log("user :>> ", user);
  const location = useLocation();

  return (
    <div className="content">
      <Navbar>
        <Navbar.Brand href="#">Soccer World</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <div>
          {loginLogout.map((item, index) => (
            <NavLink to={item.path} key={index}>
              {!user ? (
                <Button variant="outline-light">LOGIN</Button>
              ) : (
                <Dropdown>
                  <DropdownButton
                    variant="transparent"
                    drop="start"
                    title={
                      <NavLink to={location.pathname}>
                        <FontAwesomeIcon
                          className="icon"
                          icon={faUser}
                          beatFade
                        />
                      </NavLink>
                    }
                  >
                    <NavLink to={"/profile"} className="dropdown-item">
                      {user.email}
                    </NavLink>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </DropdownButton>
                </Dropdown>
              )}
            </NavLink>
          ))}
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
