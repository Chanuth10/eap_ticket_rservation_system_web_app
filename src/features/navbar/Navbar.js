import React from "react";
import { Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import loginImg from "../../assets/images/logo.jpg";
import "./navbar.css";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/users",
    display: "Staff",
  },
  {
    path: "/travelers",
    display: "Travelers",
  },
  {
    path: "/reservations",
    display: "Reservations",
  },
  {
    path: "/train",
    display: "Train",
  },
];
const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const filteredList =
    localUser?.data?.userType !== "b-office"
      ? nav__links.filter((item) => item.display !== "Train")
      : nav__links;

  console.log("filteredList", filteredList);
  return (
    <header className="header">
      <Container className="container">
        <Row className="row">
          <div className="nav__wrapper">
            <div className="logo">
              <img src={loginImg} alt="" />
            </div>
            <div className="navigation">
              <ul className="menu">
                {filteredList.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <li
                  className="nav__item"
                  style={{ fontWeight: "bold", cursor: "pointer" }}>
                  <NavLink
                    to={"/login"}
                    onClick={() => localStorage.setItem("authenticated", null)}
                    className={""}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Navbar;
