import { useEffect, useState } from "react";
import baseUrl from "../../utils/baseurl";
import Cards from "../components/Cards";

type User = {
  _id: string;
  email: string;
  username?: string;
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
    playerOwner: string;
    image: string;
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
    <div>
      {card.map((user) => (
        <div className="content-container">
          <div key={user._id}>
            <p className="allPlayersP">Cards created from: {user.email}</p>
            <div className="allPlayersCards">
              {user.favPlayer ? (
                user.favPlayer.map((player) => (
                  <a key={player._id}>
                    <Cards player={player} />
                  </a>
                ))
              ) : (
                <li>No players found</li>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPlayers;
