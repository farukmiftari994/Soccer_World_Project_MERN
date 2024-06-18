const getMatches = async () => {
  const myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", process.env.API_NEWS);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      //   "https://api.football-data.org/v4/teams/65/matches?status=FINISHED&limit=1",
      "https://api.football-data.org/v4/matches",
      requestOptions
    );
    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    console.log("result :>> ", result);
    return result;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export { getMatches };
