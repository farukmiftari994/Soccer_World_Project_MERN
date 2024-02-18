import { useEffect, useState } from "react";
import baseUrl from "../../utils/baseurl";

type User = {
  _id: string;
  email: string;
  username: string;
  players: { _id: string; name: string; value: string }[];
};

// type APIResponseAllPlayers = {
//   card: User[];
//   number: number;
// };

const PlayerCards = () => {
  const [card, setCard] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     try {
  //       const res = await fetch(`${baseUrl}/api/users/all`);

  //       const data: APIResponseAllPlayers = await res.json();

  //       setCard(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchAllUsers();
  // }, []);

  useEffect(() => {
    const fetchAllUsers = () => {
      fetch(`${baseUrl}/api/users/all`)
        .then((res) => res.json())
        .then((res) => {
          const result = res;
          console.log("result :>> ", result);

          const foundCard = result.card;
          console.log("result.card :>> ", result.card);

          console.log("card.result :>> ", card);
          console.log("found", foundCard);
          // setAllPlayers(foundPlayer.allPlayers);
          setCard(foundCard);
        })
        .catch((e) => console.log(e));
    };
    fetchAllUsers();
  }, []);
  console.log("data here:>> ", card);

  return (
    <div className="content-container">
      {card &&
        card.map((player) => (
          <div key={player._id}>
            <p>{player.username}</p>
            <ul>
              {player.players.map((p) => (
                <li key={p._id}>
                  {p.name}: {p.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PlayerCards;
