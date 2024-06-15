import "../App.css";
import image from "../img/Presentation1.png";

function Home() {
  return (
    <>
      <div className="content-container">
        <img
          src={image}
          alt=""
          style={{
            width: "80%",
            height: "70%",
            margin: "70px",
          }}
        />
      </div>
    </>
  );
}

export default Home;
