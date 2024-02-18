import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

function Administrator() {
  const { player, createPlayer } = useContext(AuthContext);
  const [name, setName] = useState(player ? player.name : "");
  console.log("name :>> ", name);
  const [value, setValue] = useState(player ? player.value : "");
  console.log("value :>> ", value);

  const handlePlayer = async () => {
    await createPlayer({ name, value });
  };

  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Value" className="mb-3">
        <Form.Control
          value={value}
          type="text"
          placeholder="value"
          onChange={(e) => setValue(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={handlePlayer}>Add a Player</Button>
    </>
  );
}

export default Administrator;
