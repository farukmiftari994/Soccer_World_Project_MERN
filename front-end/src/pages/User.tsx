import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../context/AuthContext";
import { Tab, Tabs } from "react-bootstrap";
import PlayerCards from "../components/PlayerCards";
import { Player } from "../@types/users";
import { Navigate } from "react-router-dom";

type User = {
  _id: string;
  email: string;
  username?: string;
  role: string;
  favPlayer?: {
    _id: string;
    name: string;
    overall: string;
    position: string;
    pace: string;
    shooting: string;
    passing: string;
    dribbling: string;
    defense: string;
    physicality: string;
    playerOwner: string | null;
    image: string;
  }[];
};

function User() {
  const { user, updateUser, deleteUser, deletePlayer, logout } =
    useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : "");
  const [username, setUsername] = useState(user ? user.username : "");

  const [redirect, setRedirect] = useState(false);

  // console.log("this is player", user);
  const handleSubmit = async () => {
    await updateUser({
      email,
      username,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      // Set redirect to true after successful deletion
      setRedirect(true);
      logout();
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      await deletePlayer(playerId);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  console.log("user.favPlayer :>> ", user);

  if (user)
    return (
      <div className="content-container">
        <div
          className="theForm"
          style={{ width: "900px", height: "600px", marginTop: "50px" }}
        >
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 d-flex justify-content-center"
          >
            <Tab eventKey="profile" title="PROFILE">
              <Form
                style={{
                  paddingTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label className="pe-4 text-light">
                      <b>Current Email</b>
                    </Form.Label>
                    <Form.Label
                      style={{
                        color: "rgba(151, 1085, 1035, 9.814)",
                      }}
                    >
                      <b>{user.email}</b>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className=" text-light">
                      <b>Current Username</b>
                    </Form.Label>
                    <Form.Label style={{ color: "blue" }}>
                      {user.username}
                    </Form.Label>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="text-light">
                      <b>Change Email</b>
                    </Form.Label>
                    <Form.Control
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label className=" text-light">
                      <b>Change Password</b>
                    </Form.Label>
                    <Form.Control type="password" placeholder="***********" />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label className="text-light">
                      <b>Change Username</b>
                    </Form.Label>

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
                <Button
                  variant="primary"
                  onClick={() => {
                    window.confirm(
                      "Are you sure you want to delete your account"
                    ) && handleDelete();
                  }}
                >
                  Delete Account
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="home" title="PLAYERS">
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div className="allPlayersCards">
                  {Array.isArray(user?.favPlayer) ? (
                    user?.favPlayer.map((player: Player | undefined) =>
                      player ? (
                        <a key={player._id}>
                          <div>
                            <PlayerCards
                              player={player}
                              handleDeletePlayer={handleDeletePlayer}
                            />
                          </div>
                        </a>
                      ) : null
                    )
                  ) : (
                    <li>No players found</li>
                  )}
                </div>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
}

export default User;
