import Form from "react-bootstrap/Form";

function createPlayer() {
  return (
    <div style={{ width: "400px" }} className="d-flex justify-content-center">
      {/* <FloatingLabel controlId="floatingSelectGrid"> */}
      <Form.Select aria-label="Floating label select example">
        <option>Choose Player</option>
        <option value="1">Cristiano Ronaldo</option>
        <option value="2">Lionel Messi</option>
        <option value="3">Martin Odegaard</option>
      </Form.Select>
      {/* </FloatingLabel> */}
    </div>
  );
}

export default createPlayer;
