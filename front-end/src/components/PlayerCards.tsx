import { Player } from "../@types/users";

interface CardsProps {
  player: Player | undefined;
}

const Cards: React.FC<CardsProps> = ({ player }) => {
  if (!player) {
    return <div>No player selected</div>;
  }
  return (
    <div
      style={{
        // paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="cardContainer2">
        <p className="ovr2">{player.overall}</p>
        <div className="divPosition2">
          <p className="position2">{player.position}</p>
        </div>
        <img className="img2" src={player.image} />

        <h5>{player.name}</h5>
        <div className="ratings2">
          <div>
            <p className="pac2">{player.pace} PAC</p>
            <p className="sho2">{player.shooting} SHO</p>
            <p className="pas2">{player.passing} PAS</p>
          </div>
          <div>
            <p className="dri2">DRI {player.dribbling}</p>
            <p className="def2">DEF {player.defense}</p>
            <p className="phy2">PHY {player.physicality}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
