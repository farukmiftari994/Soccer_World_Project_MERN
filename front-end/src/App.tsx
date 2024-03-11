import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import SiteMenu from "./components/SiteMenu";
import LoginLogout from "./pages/LoginLogout.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import User from "./pages/User.tsx";
import NavBar from "./components/NavBar.tsx";
import CreateCard from "./pages/CreateCard.tsx";
import UserPlayers from "./pages/UpdatePlayers.tsx";
import Administrator from "./pages/Administrator.tsx";
import AllPlayers from "./pages/AllPlayers.tsx";
import UpdatePlayers from "./pages/UpdatePlayers.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <NavBar />
          <SiteMenu>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route>
                <Route path="/user" element={<User />} />
              </Route>
              <Route path="/user/players" element={<UserPlayers />} />

              <Route path="/login" element={<LoginLogout />} />
              <Route path="/about" element={<About />} />
              <Route path="/allPlayers" element={<AllPlayers />} />
              <Route path="/addPlayer" element={<Administrator />} />
              <Route
                path="/updatePlayers"
                element={
                  <ProtectedRoute>
                    <UpdatePlayers />
                  </ProtectedRoute>
                }
              />
              <Route path="/createCard" element={<CreateCard />} />
            </Routes>
          </SiteMenu>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
