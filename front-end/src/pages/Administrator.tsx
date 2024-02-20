import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

function Administrator() {
  const { player, createPlayer } = useContext(AuthContext);
  const [name, setName] = useState(player ? player.name : "");
  console.log("name :>> ", name);
  const [overall, setOverall] = useState(player ? player.overall : "");
  const [position, setPosition] = useState(player ? player.position : "");
  const [pace, setPace] = useState(player ? player.pace : "");
  const [shooting, setShooting] = useState(player ? player.shooting : "");
  const [passing, setPassing] = useState(player ? player.passing : "");
  const [dribbling, setDribbling] = useState(player ? player.dribbling : "");
  const [defense, setDefense] = useState(player ? player.defense : "");
  const [physicality, setPhysicality] = useState(
    player ? player.physicality : ""
  );
  const handlePlayer = async () => {
    await createPlayer({
      name,
      overall,
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defense,
      physicality,
    });
  };

  return (
    <div className="content-container">
      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Overall" className="mb-3">
        <Form.Control
          value={overall}
          type="text"
          placeholder="Overall"
          onChange={(e) => setOverall(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Position"
        className="mb-3"
      >
        <Form.Control
          value={position}
          type="text"
          placeholder="Position"
          onChange={(e) => setPosition(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Pace" className="mb-3">
        <Form.Control
          value={pace}
          type="text"
          placeholder="Pace"
          onChange={(e) => setPace(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Shooting"
        className="mb-3"
      >
        <Form.Control
          value={shooting}
          type="text"
          placeholder="Shooting"
          onChange={(e) => setShooting(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Passing" className="mb-3">
        <Form.Control
          value={passing}
          type="text"
          placeholder="Passing"
          onChange={(e) => setPassing(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Dribbling"
        className="mb-3"
      >
        <Form.Control
          value={dribbling}
          type="text"
          placeholder="Dribbling"
          onChange={(e) => setDribbling(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Defense" className="mb-3">
        <Form.Control
          value={defense}
          type="text"
          placeholder="Defense"
          onChange={(e) => setDefense(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Physicality"
        className="mb-3"
      >
        <Form.Control
          value={physicality}
          type="text"
          placeholder="Physicality"
          onChange={(e) => setPhysicality(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={handlePlayer}>Add a Player</Button>
    </div>
  );
}

export default Administrator;
