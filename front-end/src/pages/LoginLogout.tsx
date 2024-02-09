import { Tab, Tabs } from "react-bootstrap";
import AuthForm from "../components/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function LoginLogout() {
  const { user, login, signup } = useContext(AuthContext);
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="content-container">
      <div className="tab-container">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3 d-flex justify-content-center"
        >
          <Tab eventKey="profile" title="SIGN IN">
            <AuthForm submitTitle="Login" submit={login} />
          </Tab>
          <Tab eventKey="home" title="SIGN UP">
            <AuthForm submitTitle="Sign Up" submit={signup} />
          </Tab>
          <Tab eventKey="house" title="PROFILE"></Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginLogout;
