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
