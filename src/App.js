import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ContentBlock from "./components/ContentBlock";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import Login from "./components/LoginDash";
import Register from "./components/RegisterDash";
import UserProfile from "./components/UserProfile";

import "./css/tailwind.css";
import "./css/GlobalStyles.css";

import "./js/api.js";
import Cart from "./features/Cart.js";

/**
 * The main App component which renders the Router with Header, Routes and Footer components.
 *
 * The Routes component contains all the available routes for the application, including
 * the home page, movie details page, cart page, login page, registration page and user profile page.
 *
 * @returns {JSX.Element} The main App component.
 */
function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<ContentBlock />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login-auth" element={<Login />} />
                    <Route path="/registration" element={<Register />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
