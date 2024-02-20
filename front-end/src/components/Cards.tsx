import myImage from "../img/cristiano-ronaldo-png-45086.png";

interface CardsProps {
  player: Player | undefined;
}

const Cards: React.FC<CardsProps> = ({ player }) => {
  if (!player) {
    return <div>No player selected</div>;
  }
  return (
    <div className="content-container">
      <div className="cardContainer">
        <p className="ovr">{player.overall}</p>
        <p className="position">{player.position}</p>
        <img src={myImage} />

        <h5>{player.name}</h5>
        <div className="ratings">
          <div>
            <p className="pac">{player.pace} PAC</p>
            <p className="sho">{player.shooting} SHO</p>
            <p className="pas">{player.passing} PAS</p>
          </div>
          <div>
            <p className="dri">DRI {player.dribbling}</p>
            <p className="def">DEF {player.defense}</p>
            <p className="phy">PHY {player.physicality}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
