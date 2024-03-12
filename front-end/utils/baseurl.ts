const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : (import.meta.env.VITE_SERVERBASE as string);

export default baseUrl;
