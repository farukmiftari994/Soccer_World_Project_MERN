import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
import { UploadFileResponse } from "../@types";

type Props = {
  submitTitle: string;
  submit: (email: string, password: string) => Promise<void>;
  Tag?: React.ElementType;
  ButtonTag?: React.ElementType;
  isInput?: boolean;
};

const AuthForm = ({ submitTitle, submit, Tag, isInput, ButtonTag }: Props) => {
  const { loading } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValues.email || !inputValues.password)
      return alert("All fields must be included");
    await submit(inputValues.email, inputValues.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.type]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLFormElement>) => {
    console.log("e.target", e.target);
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitFile = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/players/pictureUpload",
        requestOptions
      );
      if (!response.ok) {
        console.log("Something Happend!");
      }
      if (response.ok) {
        const result = (await response.json()) as UploadFileResponse;
        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
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
      <form>
        {isInput && (
          <div>
            <Tag type="file" onChange={handleFileChange} />
            <ButtonTag onClick={handleSubmitFile}>Upload Picture</ButtonTag>
          </div>
        )}
      </form>
    </>
  );
};

export default AuthForm;
