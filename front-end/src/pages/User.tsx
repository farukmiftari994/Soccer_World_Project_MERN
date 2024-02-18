import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../context/AuthContext";
import { Tab, Tabs } from "react-bootstrap";

function User() {
  const { user, updateUser } = useContext(AuthContext);

  const [email, setEmail] = useState(user ? user.email : "");
  console.log("email okej:>> ", email);

  const [username, setUsername] = useState(user ? user.username : "");
  console.log("username :>> ", username);

  console.log("this is player", user);
  const handleSubmit = async () => {
    await updateUser({
      email,
      username,
    });
  };

  if (user)
    return (
      <div className="content-container">
        <div className="tab-container">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 d-flex justify-content-center"
          >
            <Tab eventKey="profile" title="PROFILE">
              <Form
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label className="pe-4">Current Email</Form.Label>
                    <Form.Label style={{ color: "blue" }}>
                      {user.email}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="pe-4">Current Username</Form.Label>
                    <Form.Label style={{ color: "blue" }}>
                      {user.username}
                    </Form.Label>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Change Email</Form.Label>
                    <Form.Control
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control type="password" placeholder="***********" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Change Username</Form.Label>

                    <Form.Control
                      value={username}
                      type="text"
                      placeholder={
                        user.username ? user.username : "Choose a Username"
                      }
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Button variant="primary" onClick={handleSubmit}>
                  Update
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="home" title="PLAYER">
              <Form
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              ></Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
}

export default User;
