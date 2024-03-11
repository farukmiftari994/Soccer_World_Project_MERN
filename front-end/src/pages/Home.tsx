import "../App.css";
import image from "../img/Presentation1.png";

function Home() {
  return (
    <>
      <div className="content-container">
        <img
          src={image}
          alt=""
          style={{ marginTop: "120px", width: "80%", height: "70%" }}
        />
      </div>
    </>
  );
}

export default Home;
