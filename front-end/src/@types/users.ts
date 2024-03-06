export interface User {
  _id: string;
  email: string;
  username?: string;
  role: string;
  createdAt: string;
  favPlayer?: {
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
    playerOwner: string;
    image: string;
  };
}

export interface Player {
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
  playerOwner: string | null;
  image: string;
}
