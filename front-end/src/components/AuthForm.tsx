import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

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
      return alert("all fields must be included");
    submit(inputValues.email, inputValues.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.type]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={inputValues.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={inputValues.password}
        onChange={handleChange}
      />
      <button type="submit">{loading ? "Loading..." : submitTitle}</button>
    </form>
  );
};

export default AuthForm;
