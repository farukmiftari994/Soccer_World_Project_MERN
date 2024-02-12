import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";

type Props = {
  submitTitle: string;
  submit: (email: string, password: string) => void;
};

const AuthForm = ({ submitTitle, submit }: Props) => {
  const { loading } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValues.email || !inputValues.password)
      return alert("All fields must be included");
    submit(inputValues.email, inputValues.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.type]: e.target.value });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Form.Control
        type="email"
        placeholder="Email"
        value={inputValues.email}
        onChange={handleChange}
        style={{ width: "300px", fontSize: "14px" }}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        value={inputValues.password}
        onChange={handleChange}
        style={{ width: "300px", fontSize: "14px" }}
      />
      <Button type="submit" style={{ width: "200px", fontSize: "14px" }}>
        {loading ? "Loading..." : submitTitle}
      </Button>
    </Form>
  );
};

export default AuthForm;
