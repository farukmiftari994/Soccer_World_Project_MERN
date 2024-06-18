import { getMatches } from "../utils/newsServices.js";

const getAllNews = async (req, res) => {
  console.log("process.env.API_NEWS :>> ", process.env.API_NEWS);
  const allMatches = await getMatches();
  if (!allMatches) {
    res.status(204).json({ message: "There's no Content" });
  }
  if (allMatches) {
    console.log("allMatches :>> ", allMatches);
    res.status(200).json({ allMatches });
  }
};

export { getAllNews };
