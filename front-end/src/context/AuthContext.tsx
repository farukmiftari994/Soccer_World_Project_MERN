import { PropsWithChildren, createContext, useEffect, useState } from "react";
import baseUrl from "../../utils/baseurl";
import { PlayerResponse, ResNotOk, SignupResponse } from "../@types";
import { Player } from "../@types/users";
import User from "../pages/User";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  player: Player | null;
  allUsers: () => void;
  getProfile: () => Promise<void>;
  allPlayers: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateUser: (values: {
    email: string;
    username: string | undefined;
    favPlayer?: string | undefined;
  }) => Promise<void>;
  deletePlayer: (playerId: string) => Promise<void>;
  deleteUser: () => Promise<void>;
  // asyncronised function always return a promise
  createPlayer: (values: {
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
    image: string;
  }) => Promise<void>;
  updateUserWithPlayer: (
    playerId: string,
    userId: string,
    name: string,
    overall: string,
    position: string,
    pace: string,
    shooting: string,
    passing: string,
    dribbling: string,
    defense: string,
    physicality: string,
    image: string
  ) => Promise<void>;
}

const defaultValue: AuthContextType = {
  user: null,
  // admin: null,
  player: null,
  allUsers: () => {
    throw new Error("no provider");
  },
  allPlayers: () => {
    throw new Error("no provider");
  },
  login: () => {
    throw new Error("no provider");
  },
  getProfile: () => {
    throw new Error("no provider");
  },

  logout: () => {
    throw new Error("no provider");
  },
  signup: () => {
    throw new Error("no provider");
  },
  updateUser: () => {
    throw new Error("no provider");
  },
  deletePlayer: () => {
    throw new Error("no provider");
  },
  deleteUser: () => {
    throw new Error("no provider");
  },
  createPlayer: () => {
    throw new Error("no provider");
  },
  updateUserWithPlayer: () => {
    throw new Error("no provider");
  },
  // loading: false,
};

export const AuthContext = createContext(defaultValue);

type LoginDataType = {
  user: User;
  token: string;
};

type LoginResponse = {
  message: string;
  error: boolean;
  data: LoginDataType;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("user :>> ", user);
  const [player, setPlayer] = useState<Player | null>(null);
  console.log("player :>> ", player);

  const navigateTo = useNavigate();

  const allUsers = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", "");

    const requestOptions = {
      method: "GET",
      headers,
      body,
    };
    try {
      const response = await fetch(`${baseUrl}/api/users/all`, requestOptions);
      if (response.ok) {
        const result = (await response.json()) as LoginResponse;
        setUser(result.data.user);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allPlayers = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("name", "");

    const requestOptions = {
      method: "GET",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/players/all`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as PlayerResponse;
        console.log("this is the one :>> ", result);
        setPlayer(result.player);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (email: string, password: string) => {
    console.log("Signup function triggered");
    if (!email || !password) return alert("ALL field must be included");
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);
    const options = {
      method: "POST",
      headers,
      body,
    };
    try {
      const response = await fetch(`${baseUrl}/api/users/signup`, options);
      if (response.ok) {
        const result = (await response.json()) as SignupResponse;
        setUser(result.user as User);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/login`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as LoginResponse;
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          setUser(result.data.user);
        }
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
        if (!user) return alert("Email or password is invalid");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (values: {
    email: string;
    username: string | undefined;
    favPlayer?: string | undefined;
  }) => {
    if (!user) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(values);
    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/update/${user._id}`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as User;
        setUser(result);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPlayer = async (values: {
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
    image: string;
  }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(values);

    const options = {
      method: "POST",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/players/createPlayers`,
        options
      );
      if (response.ok) {
        const result = (await response.json()) as Player;
        // console.log("the result :>> ", result);
        setPlayer(result);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlayer = async (playerId: string) => {
    const token = localStorage.getItem("token");

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Bearer ${token}`);

    const body = new URLSearchParams();
    body.append("playerId", playerId);
    const options = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/deletePlayer`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Deleted player successfully:", result);

        //update user state
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            favPlayer: prev.favPlayer?.filter(
              (player) => player._id !== playerId
            ),
          };
        });
      } else {
        const result = await response.json();
        console.error("Failed to delete player:", result.error);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const deleteUser = async () => {
    if (!user) return;
    const body = new URLSearchParams();
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      body,
      headers: myHeaders,
    };

    fetch(`${baseUrl}/api/users/delete/${user?._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const updateUserWithPlayer = async (
    playerId: string,
    userId: string,
    name: string,
    overall: string,
    position: string,
    pace: string,
    shooting: string,
    passing: string,
    dribbling: string,
    defense: string,
    physicality: string,
    image: string
  ) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("playerId", playerId);
    body.append("userId", userId);
    body.append("name", name);
    body.append("overall", overall);
    body.append("position", position);
    body.append("pace", pace);
    body.append("shooting", shooting);
    body.append("passing", passing);
    body.append("dribbling", dribbling);
    body.append("defense", defense);
    body.append("physicality", physicality);
    body.append("image", image);

    var options = {
      method: "PATCH",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/users/updateUserList`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        navigateTo("/allPlayers");
        console.log("result:>> ", result);
        setUser(result.updateUserWithPlayer);
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          `${baseUrl}/api/users/profile`,
          requestOptions
        );
        if (response.ok) {
          const result = (await response.json()) as LoginResponse;

          console.log("result for getProfile", result);
          setUser(result.data.user);
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // //? to run the "checkUserStatus()" function or the useEffect not only when wh refresh the page but
  // //? also everytime the state of the user changes

  return (
    <AuthContext.Provider
      value={{
        user,
        player,
        allUsers,
        allPlayers,
        login,
        logout,
        signup,
        updateUser,
        deletePlayer,
        deleteUser,
        getProfile,
        createPlayer,
        updateUserWithPlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
