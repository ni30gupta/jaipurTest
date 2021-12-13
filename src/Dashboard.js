import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = React.useState({});

  let Navigate = useNavigate();
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  if (!user) {
    Navigate("/");
  }
  return (
    <div>
      <h1>
        Welcome <strong>{user?.email}</strong>{" "}
      </h1>
      <Button onClick={() => setUser(localStorage.clear())} variant="danger">
        Log Out
      </Button>
    </div>
  );
}

export default Dashboard;
