import { useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { Button, Col, Form } from "react-bootstrap";

type Props = {
  submitTitle: string;
  submit: (email: string, password: string) => Promise<void>;
};

const AuthForm = ({ submitTitle, submit }: Props) => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValues.email || !inputValues.password)
      return alert("All fields must be included");
    await submit(inputValues.email, inputValues.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.type]: e.target.value });
    //? ... (means rest operator)
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "-30px",
        }}
      >
        <Col md>
          <Form.Control
            type="email"
            placeholder="Email"
            value={inputValues.email}
            onChange={handleChange}
          />
        </Col>
        <Col md>
          <Form.Control
            type="password"
            placeholder="Password"
            value={inputValues.password}
            onChange={handleChange}
          />
        </Col>

        <Button
          type="submit"
          style={{
            marginTop: "10px",
            border: "2px solid black",
            width: "100%",
          }}
        >
          {submitTitle}
        </Button>
      </Form>
    </>
  );
};

export default AuthForm;
