import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './login.css'

import loginImg from '../../../assets/images/login.png'
import userIcon from '../../../assets/images/user.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(isAuthenticated);
  const [loginNIC, setLoginNIC] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginNIC, loginPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated]);

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

              <Form onSubmit={loginSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="NIC" placeholder="Enter user NIC" value={loginNIC} onChange={(e) => setLoginNIC(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control type="password" placeholder="Enter user Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
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
