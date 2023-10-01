import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import loginImg from '../../assets/images/logo.jpg'
import "./navbar.css";

const nav__links = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/not',
    display: 'About'
  },
  {
    path: '/booking',
    display: 'Booking'
  },
]

const Navbar = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={loginImg} alt='' ></img>
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {
                  nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>
                <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                <Button className='btn primary__btn'>
                    <Link to='/signup'>SignUp</Link>
                </Button>
              </div>

              <span className='mobile__menu'>
                <i class='ri-menu-line'></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Navbar
