import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './login.css'

import registerImg from '../../../assets/images/register.png'
import userIcon from '../../../assets/images/user.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [userName, setUserName] = useState("");
  const [nic, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    dispatch(register(userName, nic, password, userType, email));
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
              <img src={registerImg} alt=''></img>
            </div>
            <div className='login__form'>
              <div className='user'>
                <img src={userIcon} alt=''></img>
              </div>
              <h2>Login</h2>

              <Form onSubmit={Submit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter user NIC" value={nic} onChange={(e) => setNIC(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="email" placeholder="Enter user email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control type="password" placeholder="Enter user Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control type="text" placeholder="Enter user type" value={userType} onChange={(e) => setUserType(e.target.value)} />
                </Form.Group>
                <Button className='btn secondary__btn auth__btn' type='submit'>SignUp</Button>
              </Form>
              <p>Don't have an account? <Link to='/login'>Create</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Login
