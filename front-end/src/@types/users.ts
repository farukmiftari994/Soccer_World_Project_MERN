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
  value: string;
  playerOwner?: string;
}
