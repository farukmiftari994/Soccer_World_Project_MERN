import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import baseUrl from "../../utils/baseurl";
import { Button, Row } from "react-bootstrap";
// import myImage from "../img/arsenal.jpg";
import { AuthContext } from "../context/AuthContext";
import Cards from "../components/Cards";
import { Player } from "../@types/users";

// type APIResponseAllPlayers = {
//   allPlayers: Player[];
//   number: number;
// };

function CreateCard() {
  const { user, updateUserWithPlayer } = useContext(AuthContext);
  const [ownedPlayers, setOwnedPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined
  );
  // const [userId, setUserId] = useState(user?._id);
  const [playerId, setPlayerId] = useState("");

  console.log("user :>> ", user);
  // console.log("hey", selectedPlayer);

  useEffect(() => {
    const fetchAllPlayers = () => {
      fetch(`${baseUrl}/api/players/all`)
        .then((res) => res.json())
        .then((res) => {
          const result = res;

          const foundPlayer = result.allPlayers as Player[];
          const filterOwnedPlayers = foundPlayer.filter((player) => {
            if (!player.playerOwner) {
              return true;
            } else return false;
          });
          console.log("foundPlayer", foundPlayer);

          setOwnedPlayers(filterOwnedPlayers);
        })
        .catch((e) => console.log(e));
    };
    fetchAllPlayers();
  }, []);
  // console.log("user :>> ", user);
  // console.log("player :>> ", player);

  // console.log("userId :>> ", userId);
  // console.log("playerId :>> ", playerId);

  const handleChange = async () => {
    // console.log("playerId, user?._id :>> ", playerId, user?._id);
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
    const player = ownedPlayers.find((p) => p._id === selectedPlayerId);

    setSelectedPlayer(player);
  };

  if (user)
    return (
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "70px", color: "white" }}
      >
        <div
          style={{ width: "400px" }}
          className="d-flex justify-content-center"
        >
          <Row className="d-flex justify-content-center ">
            <h3
              className="d-flex justify-content-center"
              style={{
                backgroundColor: "rgba(52, 116, 327, 0.549)",
              }}
            >
              Create a Player Card
            </h3>
            <Form.Group className="pb-4 pt-5">
              <Form.Select
                aria-label="Floating label select example"
                onChange={handlePlayerChange}
              >
                <option key="default">Select Player</option>
                {ownedPlayers &&
                  ownedPlayers.map((players) => {
                    return (
                      <option value={players._id} key={players._id}>
                        {players.name}
                      </option>
                    );
                  })}
              </Form.Select>
              {selectedPlayer && (
                <div className="d-flex row justify-content-center">
                  <Cards player={selectedPlayer} key={selectedPlayer._id} />
                  <Button onClick={handleChange}>Create a Player Card</Button>
                </div>
              )}
            </Form.Group>
          </Row>
        </div>
      </div>
    );
}

export default CreateCard;
