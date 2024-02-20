interface User {
  _id: string;
  email: string;
  username?: string;
  createdAt: string;
  favPlayer?: string;
}

interface Player {
  _id: string;
  name: string;
  overall: string;
  position: string;
  pace: string;
  shooting: string;
  passing: string;
  dribbling: string;
  defense: string;
  physicality: string;
  playerOwner?: string;
}
