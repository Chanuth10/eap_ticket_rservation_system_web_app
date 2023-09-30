import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import './login.css'

import registerImg from '../../../assets/images/register.png'
import userIcon from '../../../assets/images/user.png'

const Signup = () => {

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt=''></img>
              </div>
              <div className='login__form'>
                <div className='user'>
                  <img src={userIcon} alt=''></img>
                </div>
                <h2>Register</h2>

                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="NIC" placeholder="NIC" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Register</Button>
                </Form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Signup
