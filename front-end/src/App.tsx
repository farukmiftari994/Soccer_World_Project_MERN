import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import SiteMenu from "./components/SiteMenu";
import LoginLogout from "./pages/LoginLogout.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import User from "./pages/User.tsx";
import NavBar from "./components/NavBar.tsx";
import CreatePlayer from "./pages/CreatePlayer.tsx";
import UserPlayers from "./pages/UserPlayers.tsx";
import Administrator from "./pages/Administrator.tsx";
import AllPlayers from "./pages/AllPlayers.tsx";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <NavBar />
          <SiteMenu>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route>
                <Route path="/user" element={<User />} />
              </Route>
              <Route path="/user/players" element={<UserPlayers />} />
              <Route path="/create" element={<CreatePlayer />} />
              <Route path="/login" element={<LoginLogout />} />
              <Route path="/about" element={<About />} />
              <Route path="/allPlayers" element={<AllPlayers />} />
              <Route path="/createPlayer" element={<Administrator />} />
              <Route path="/create" element={<CreatePlayer />} />
            </Routes>
          </SiteMenu>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
