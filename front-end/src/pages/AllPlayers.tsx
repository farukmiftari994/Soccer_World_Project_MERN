import { useEffect, useState } from "react";
import baseUrl from "../../utils/baseurl";

type User = {
  _id: string;
  email: string;
  username?: string;
  favPlayer?: {
    _id: string;
    name: string;
    value: string;
    playerOwner: string;
  }[];
};

const AllPlayers = () => {
  const [card, setCard] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/users/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("qetu esht data :>> ", data);

        setCard(data); // Assuming data is an array of User objects
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchAllUsers();
  }, []);

  console.log("data heretttt:>> ", card);

  return (
    <div className="content-container">
      <div className="content-container">
        {card.map((user) => (
          <div key={user._id}>
            <p>{user.email}</p>
            <ul>
              {user.favPlayer ? (
                user.favPlayer.map((player) => (
                  <li key={player._id}>
                    {player.name}: {player.value}
                  </li>
                ))
              ) : (
                <li>No players found</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
