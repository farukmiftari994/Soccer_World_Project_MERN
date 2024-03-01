import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import baseUrl from "../../utils/baseurl";
import { Button, Row } from "react-bootstrap";
// import myImage from "../img/arsenal.jpg";
import { AuthContext } from "../context/AuthContext";
import Cards from "../components/Cards";

// type APIResponseAllPlayers = {
//   allPlayers: Player[];
//   number: number;
// };
interface Player {
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
  image: string;
  playerOwner: {
    _id: string;
    email: string;
    username?: string | undefined;
    favPlayer?: string | undefined;
  }[];
}

function CreatePlayer() {
  const { user, player, updateUserWithPlayer } = useContext(AuthContext);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined
  );
  const [userId, setUserId] = useState(user?._id);
  const [playerId, setPlayerId] = useState("");

  console.log("hey", selectedPlayer);

  useEffect(() => {
    const fetchAllPlayers = () => {
      fetch(`${baseUrl}/api/players/all`)
        .then((res) => res.json())
        .then((res) => {
          const result = res;
          console.log("result :>> ", result);
          // const foundPlayer = res as APIResponseAllPlayers;
          const foundPlayer = result.allPlayers as Player[];
          console.log("result.allPlayers :>> ", result.allPlayers);

          console.log("allPlayers.result :>> ", allPlayers);
          console.log("found", foundPlayer);
          // setAllPlayers(foundPlayer.allPlayers);
          setAllPlayers(foundPlayer);
        })
        .catch((e) => console.log(e));
    };
    fetchAllPlayers();
  }, []);
  console.log("user :>> ", user);
  console.log("player :>> ", player);

  console.log("userId :>> ", userId);
  console.log("playerId :>> ", playerId);

  const handleChange = async () => {
    console.log("playerId, user?._id :>> ", playerId, user?._id);
    if (selectedPlayer) {
      await updateUserWithPlayer(
        playerId,
        user?._id!,
        selectedPlayer.name,
        selectedPlayer.overall,
        selectedPlayer.position,
        selectedPlayer.pace,
        selectedPlayer.shooting,
        selectedPlayer.passing,
        selectedPlayer.dribbling,
        selectedPlayer.defense,
        selectedPlayer.physicality,
        selectedPlayer.image
      );
    }
  };

  const handlePlayerChange = (event: { target: { value: any } }) => {
    const selectedPlayerId = event.target.value;
    setPlayerId(selectedPlayerId);
    const player = allPlayers.find((p) => p._id === selectedPlayerId);

    setSelectedPlayer(player);
  };

  if (user)
    return (
      <div className="content-container">
        <div
          style={{ width: "400px" }}
          className="d-flex justify-content-center"
        >
          <Row className="d-flex justify-content-center ">
            <h3 className="d-flex justify-content-center">
              Create a Player Card
            </h3>
            <Form.Group className="pb-4 pt-5">
              <Form.Select
                aria-label="Floating label select example"
                onChange={handlePlayerChange}
              >
                <option key="default">Select Player</option>
                {allPlayers &&
                  allPlayers.map((player) => {
                    return (
                      <>
                        <option value={player._id} key={player._id}>
                          {player.name}
                        </option>
                      </>
                    );
                  })}
              </Form.Select>
              {selectedPlayer && (
                <div className="d-flex row justify-content-center pt-5">
                  <Cards player={selectedPlayer} />;
                  <Button onClick={handleChange}>Create a Card</Button>
                </div>
              )}
            </Form.Group>
          </Row>
        </div>
      </div>
    );
}

export default CreatePlayer;
