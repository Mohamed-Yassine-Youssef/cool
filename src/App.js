import UserPage from "./pages/UserPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/Signup.jsx";
import Home from "./pages/Home/Home.jsx";
import { useContext } from "react";
import { Context } from "./context/Context";
import ActivationPage from "./Components/ActivationPage";
import EspaceRestorateur from "./pages/espaceRestorateur/EspaceRestorateur";
import AddRestorant from "./pages/gestionRestorant/AddRestorant";
import Menu from "./pages/menu/Menu";
import Reservation from "./pages/reservation/Reservation";
import GestionReservations from "./pages/gestionReservations/GestionReservations";
import Updateinfo from "./pages/Updateinfo/Updateinfo";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EspaceAdmin from "./pages/espaceAdmin/EspaceAdmin";
import UserEditScreen from "./pages/userEditScreen/UserEditScreen";
import Loader from "./Components/Loader";
import RestorantsBySearch from "./pages/RestorantsBySearch";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/restorateur" element={<EspaceRestorateur />} />
          <Route
            path="/restorateur/restorant"
            element={<AddRestorant />}
          ></Route>
          <Route
            path="/restorateur/reservation/:id"
            element={<Reservation />}
          ></Route>
          <Route
            path="/restorateur/gestionReservations"
            element={<GestionReservations />}
          ></Route>
          <Route path="/home/updateInfo" element={<Updateinfo />}></Route>
          <Route
            path="/home/changePassword"
            element={<ChangePassword />}
          ></Route>
          <Route path="/restorant/menu/:id" element={<Menu />}></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          ></Route>
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/home" />}
          ></Route>

          <Route path="/home" element={user ? <UserPage /> : <Home />} />
          <Route
            path="/admin"
            element={user?.isAdmin ? <EspaceAdmin /> : <Navigate to="/home" />}
          />
          <Route path="/search/:keyword" element={<RestorantsBySearch />} />
          <Route
            path="/admin/userEditScreen/:id"
            element={
              user?.isAdmin ? <UserEditScreen /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/confirm/:activationcode"
            element={<ActivationPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
