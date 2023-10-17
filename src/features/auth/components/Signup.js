import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

import registerImg from "../../../assets/images/register.png";
import userIcon from "../../../assets/images/user.png";
import { KeyGenerator } from "../../keyGen/KeyGen";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");
  const [nic, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!key) {
      setKey(KeyGenerator());
    }
  }, [key]);

  const handleOnSubmit = async () => {
    await axios.post("http://localhost:5246/api/v2/AdminManager", {
      id: key,
      userName: userName,
      nic: nic,
      password: password,
      userType: userType,
      email: email,
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    handleOnSubmit();
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, alert, isAuthenticated]);

  return (
    <Container>
      <Row>
        <Col lg="8" className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerImg} alt=""></img>
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt=""></img>
              </div>
              <h2>Login</h2>

              <Form onSubmit={Submit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    placeholder="Enter user NIC"
                    value={nic}
                    onChange={(e) => setNIC(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="email"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    type="password"
                    placeholder="Enter user Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Col sm="10">
                    <Form.Select onChange={(e) => setUserType(e.target.value)}>
                      <option>Select User Type</option>
                      <option value="t-manager">Travel Manager</option>
                      <option value="b-office">Back office worker</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Button
                  className="btn secondary__btn auth__btn"
                  type="submit"
                  disabled={
                    !userName || !nic || !password || !userType || !email
                  }>
                  SignUp
                </Button>
              </Form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
