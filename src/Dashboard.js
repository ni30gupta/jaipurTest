import React from "react";

function Dashboard() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  return (
    <div>
      <h1>
        Welcome <strong>{user.email}</strong>{" "}
      </h1>
    </div>
  );
}

export default Dashboard;
