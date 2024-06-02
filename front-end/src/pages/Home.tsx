import "../App.css";

const headers = new Headers();
headers.append("X-Auth-Token", "e833bfee20e24972a8c19d762ee25968");

const requestOptions: RequestInit = {
  method: "GET",
  headers: headers,
};

try {
  fetch(
    "https://api.football-data.org/v4/competitions/DED/standings",
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error("Error:", error));
} catch (error) {
  console.error("Fetch error:", error);
}

function Home() {
  return (
    <>
      <div className="content-container"></div>
    </>
  );
}

export default Home;
