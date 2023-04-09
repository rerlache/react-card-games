import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import BlackJack from "../features/blackJack/components/blackJack";
import CardWar from "../features/cardWar/components/CardWar";

function Navigation() {
  return (
    <>
      <BrowserRouter>
        <div className="nav-container">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/cardwar" className="nav-item">
            Card-War
          </NavLink>
          <NavLink to="/blackjack" className="nav-item">
            BlackJack
          </NavLink>
        </div>
        <Routes>
          <Route exact path="/" />
          <Route exact path="/cardwar" element={<CardWar />} />
          <Route exact path="/blackjack" element={<BlackJack />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;
