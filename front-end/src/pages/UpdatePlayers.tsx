import { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
import baseUrl from "../../utils/baseurl";
import UpdatePlayerCards from "../components/UpdatePlayerCards.tsx";
import { Player } from "../@types/users.ts";

function UpdatePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleInputChange = async (
    field: keyof Player,
    value: string,
    playerId: string
  ) => {
    const updatedPlayers = players.map((player) =>
      player._id === playerId ? { ...player, [field]: value } : player
    );
    setPlayers(updatedPlayers);
  };

  const handleSubmit = async (playerId: string) => {
    console.log("playerId :>> ", playerId);

    const playerToUpdate = players.find((player) => player._id === playerId);
    console.log("playerToUpdate :>> ", playerToUpdate);
    if (!playerToUpdate) return;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(
        `${baseUrl}/api/players/updatePlayers/${playerId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(playerToUpdate),
        }
      );
      if (response.ok) {
        const result = await response.text();
        console.log("Player updated:", result);
      } else {
        console.error("Failed to update player:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/players/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json();
        setPlayers(data.allPlayers);
        console.log("data.allPlayers :>> ", data.allPlayers);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };
    fetchAllPlayers();
  }, []);

  return (
    <div className="allPlayersCards">
      {players ? (
        players.map((player) => (
          <a key={player._id}>
            <UpdatePlayerCards
              player={player}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
          </a>
        ))
      ) : (
        <li>No players found</li>
      )}
      {/* {players.map((player) => (
        <div key={player._id}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="cardContainer">
              <p className="ovr">{player.overall}</p>
              <div className="divPosition">
                <p className="position">{player.position}</p>
              </div>
              <img src={player.image} alt={player.name} />

              <h5>{player.name}</h5>
              <div className="ratings">
                <div>
                  <Form.Control
                    value={player.name}
                    type="text"
                    onChange={(e) => {
                      console.log("player :>> ", player);
                      handleInputChange("name", e.target.value, player._id);
                    }}
                  />
                 
                </div>
             
              </div>
            </div>
            <button onClick={() => handleSubmit(player._id)}>Update</button>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default UpdatePlayers;
