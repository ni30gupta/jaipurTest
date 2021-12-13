import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const [isRegistered, setIsRegistered] = React.useState(false);
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
            value={isRegistered}
          />
        </div>
        <div className="mx-2">
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Login
          </label>
        </div>
      </div>
      {isRegistered ? <Login /> : <Signup />}
    </div>
  );
}

export default UserAuth;

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState(false);
  let Navigate = useNavigate();
  const handleSubmit = () => {
    if (user.email === "ni30@gmail.com" && user.password === "123456") {
      localStorage.setItem("userDetails", JSON.stringify(user));
      Navigate("/dashboard");
    } else {
      setError(true);
    }
  };
  return (
    <>
      <h1>Login</h1>
      {error ? <p style={{ color: "red" }}>User credentials mismatch</p> : null}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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

const Signup = () => {
  return (
    <>
      <h1>Register</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};
