import "../App.css";

async function Home() {
  const myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", "e833bfee20e24972a8c19d762ee25968");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
  };
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/DED/standings",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const result = await response.json();
      console.log("result :>> ", result);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }

  return (
    <div className="content-container">
      <h1>Football Standings</h1>
      {/* Render standings here */}
    </div>
  );
}

export default Home;
