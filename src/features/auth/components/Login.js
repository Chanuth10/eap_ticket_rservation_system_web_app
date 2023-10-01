import React from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './login.css'

import loginImg from '../../../assets/images/login.png'
import userIcon from '../../../assets/images/user.png'

const Login = () => {
  return (
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt=''></img>
            </div>
            <div className='login__form'>
              <div className='user'>
                <img src={userIcon} alt=''></img>
              </div>
              <h2>Login</h2>

              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="NIC" placeholder="NIC"  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
              </Form>
              <p>Don't have an account? <Link to='/signup'>Create</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
