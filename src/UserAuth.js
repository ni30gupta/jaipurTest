import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {}, [isRegistered]);
  // console.log(isRegistered);
  return (
    <div className=" container" style={{ maxWidth: "400px" }}>
      <div
        style={{ float: "right" }}
        className="form-check form-switch d-flex justify-content-between w-50 "
      >
        <div className="mx-5">
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Register
          </label>
        </div>
        <div className="mx-2">
          <input
            onClick={() => setIsRegistered(!isRegistered)}
            className="form-check-input"
            type="checkbox"
            checked={isRegistered}
            value={isRegistered}
          />
        </div>
        <div className="mx-2">
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Login
          </label>
        </div>
      </div>
      {isRegistered ? (
        <Login />
      ) : (
        <Signup registerstation={{ isRegistered, setIsRegistered }} />
      )}
    </div>
  );
}

export default UserAuth;

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  let Navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.email === userDetails.email &&
      user.password === userDetails.password
    ) {
      Navigate("/dashboard");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };
  return (
    <>
      <h1>Login</h1>
      {error ? <p style={{ color: "red" }}>User credentials mismatch</p> : null}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

const Signup = (props) => {
  const [user, setUser] = useState({ username: "" });
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === "") {
      alert("Username is required");
      return false;
    } else if (validate()) {
      console.log("ok");
      localStorage.setItem("userDetails", JSON.stringify(user));
      props.registerstation.setIsRegistered(true);
    }
  };

  const validate = () => {
    if (!user.email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailMsg("Please enter valid email");
      setTimeout(() => {
        setEmailMsg("");
      }, 2000);
      return false;
    } else if (user.password !== user.c_password) {
      // passRef.current.value = "";
      // c_passRef.current.value = "";
      setPasswordMsg("Password & confirm Password mismatched");
      setTimeout(() => {
        setPasswordMsg("");
      }, 2000);
      return false;
    } else {
      return true;
    }
  };

  const passRef = React.useRef();
  const c_passRef = React.useRef();
  return (
    <>
      <h1>Register</h1>
      {/* {error ? <p style={{ color: "red" }}>User credentials mismatch</p> : null} */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Enter username"
            // onBlur={validate}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={user.f_name}
            onChange={(e) => setUser({ ...user, f_name: e.target.value })}
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={user.l_name}
            onChange={(e) => setUser({ ...user, l_name: e.target.value })}
            type="text"
            placeholder="Enter Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter email"
            onBlur={validate}
          />
        </Form.Group>
        {emailMsg ? <p style={{ color: "red" }}> {emailMsg} </p> : null}

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
            ref={passRef}
          />
        </Form.Group>
        {passwordMsg ? <p style={{ color: "red" }}> {passwordMsg} </p> : null}

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={user.c_password}
            onChange={(e) => setUser({ ...user, c_password: e.target.value })}
            type="password"
            placeholder="Confirm Password"
            ref={c_passRef}
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};
