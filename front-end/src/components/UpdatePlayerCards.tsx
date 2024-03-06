import { Button, Form } from "react-bootstrap";
import { Player } from "../@types/users";

interface CardsProps {
  player: Player | undefined;
  handleSubmit: (playerId: string) => Promise<void>;
  handleInputChange: any;
}

const Cards: React.FC<CardsProps> = ({
  player,
  handleSubmit,
  handleInputChange,
}) => {
  if (!player) {
    return <div>No player selected</div>;
  }
  return (
    <div
      style={{
        // paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="cardContainer">
        <div>
          <Form.Control
            className="overall"
            style={{ textAlign: "center" }}
            value={player.overall}
            type="text"
            onChange={(e) => {
              handleInputChange("overall", e.target.value, player._id);
            }}
          />
        </div>
        <div className="divPosition">
          <div>
            <Form.Control
              style={{ textAlign: "center" }}
              className="positionInput"
              value={player.position}
              type="text"
              onChange={(e) => {
                handleInputChange("position", e.target.value, player._id);
              }}
            />
          </div>
        </div>
        <img src={player.image} />
        <div className="playerNameInput">
          <Form.Control
            className="name"
            style={{ textAlign: "center" }}
            value={player.name}
            type="text"
            onChange={(e) => {
              handleInputChange("name", e.target.value, player._id);
            }}
          />
        </div>
        <div className="d-flex  justify-content-center">
          <div className="ratings d-flex flex-nowrap">
            <div className="leftCardInputs">
              <div className="cardInputs d-flex wrap align-items-center">
                <Form.Control
                  value={player.pace}
                  type="text"
                  onChange={(e) => {
                    handleInputChange("pace", e.target.value, player._id);
                  }}
                />
                <div className="inputMarginleft">PAC</div>
              </div>

              <div className="cardInputs d-flex wrap align-items-center">
                <Form.Control
                  className="sho"
                  value={player.shooting}
                  type="text"
                  onChange={(e) => {
                    handleInputChange("shooting", e.target.value, player._id);
                  }}
                />
                <div className="inputMarginleft">SHO</div>
              </div>

              <div className="cardInputs d-flex wrap align-items-center">
                <Form.Control
                  className="pas"
                  value={player.passing}
                  type="text"
                  onChange={(e) => {
                    handleInputChange("passing", e.target.value, player._id);
                  }}
                />
                <div className="inputMarginleft">PAS</div>
              </div>
            </div>
            <div className="rightCardInputs">
              <div className="cardInputs d-flex wrap align-items-center">
                <div className="inputMarginRight1" style={{ marginRight: "" }}>
                  DRI
                </div>
                <Form.Control
                  className="dri"
                  value={player.dribbling}
                  type="text"
                  onChange={(e) => {
                    handleInputChange("dribbling", e.target.value, player._id);
                  }}
                />
              </div>

              <div className="cardInputs d-flex wrap align-items-center">
                <div className="inputMarginRight2">DEF</div>
                <Form.Control
                  className="def"
                  value={player.defense}
                  type="text"
                  onChange={(e) => {
                    handleInputChange("defense", e.target.value, player._id);
                  }}
                />
              </div>
              <div className="cardInputs d-flex wrap align-items-center">
                <div className="inputMarginRight3">PHY</div>
                <Form.Control
                  className="phy"
                  value={player.physicality}
                  type="text"
                  onChange={(e) => {
                    handleInputChange(
                      "physicality",
                      e.target.value,
                      player._id
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        style={{ width: "120px", marginTop: "-10px" }}
        onClick={() => handleSubmit(player._id)}
      >
        Update
      </Button>
    </div>
  );
};

export default Cards;
