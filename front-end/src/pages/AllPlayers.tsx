import { useContext, useEffect, useState } from "react";
import baseUrl from "../../utils/baseurl";
import Cards from "../components/Cards";
import { AuthContext } from "../context/AuthContext";

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
    playerOwner: string;
    image: string;
  }[];
};

const AllPlayers = () => {
  const { user } = useContext(AuthContext);
  const [card, setCard] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/users/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        // console.log("qetu esht data :>> ", data);

        setCard(data); // Assuming data is an array of User objects
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchAllUsers();
  }, []);
  if (!user) {
    return (
      <div className="content-container">
        <div className="theForm">
          <h1 className="d-flex justify-content-center">
            Please Login to continue
          </h1>
        </div>
      </div>
    );
  }
  if (user)
    return (
      <div>
        {card.map((user, index) => (
          <div
            key={user._id}
            style={{
              display: index + 1 !== currentPage ? "none" : undefined,
            }}
          >
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
        ))}
        <nav>
          <ul className="pagination">
            {Array.from({ length: card.length }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  style={{ marginBottom: "0" }}
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
};

export default AllPlayers;
