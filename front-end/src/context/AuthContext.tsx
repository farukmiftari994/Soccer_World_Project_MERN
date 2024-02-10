import { PropsWithChildren, createContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateUser: (values: {
    email: string;
    password: string | undefined;
  }) => Promise<void>;
  // asyncronised function always return a promise

  loading: boolean;
}

const defaultValue: AuthContextType = {
  user: null,
  login: () => {
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
  loading: false,
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  console.log("children :>> ", children);

  const signup = async (email: string, password: string) => {
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
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        options
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

  const login = async (email: string, password: string) => {
    if (!user) return alert("There's no user with that email");
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
        "http://localhost:5000/api/users/login",
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

  const logout = () => {
    setUser(null);
  };

  const updateUser = async (values: {
    email: string;
    password: string | undefined;
  }) => {
    if (!user) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(values);
    var requestOptions = {
      method: "POST",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/update/${user._id}`,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
