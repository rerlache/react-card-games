import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
  } from "react-router-dom";
import BlackJack from "../features/blackJack/components/blackJack";

function Navigation() {
  return (
    <>
      <Router>
        <div className="nav-container">
          <NavLink to="/" className='nav-item'>Home</NavLink>
          <NavLink to="/blackjack" className='nav-item'>BlackJack</NavLink>
        </div>
        <Routes>
            <Route exact path="/" />
            <Route exact path="/blackjack" element={<BlackJack />} />
        </Routes>
      </Router>
    </>
  );
}

export default Navigation;
