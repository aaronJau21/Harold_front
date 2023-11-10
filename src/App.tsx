import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import { CajaPage } from "./pages/box/CajaPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useLocalStorage } from "react-use";
import { Home } from "./layouts/Home";

function App() {
  const [user] = useLocalStorage("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute canActivate={user} />}>
          <Route element={<Home />}>
            <Route path="/caja" element={<CajaPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
