const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export default baseUrl;
