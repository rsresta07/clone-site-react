import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentBlock from "./components/ContentBlock";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import "./css/tailwind.css";
import "./css/GlobalStyles.css";
import "./js/api.js";
import Cart from "./components/Cart";
import Login from "./components/LoginDash";
import Register from "./components/RegisterDash";
import UserProfile from "./components/UserProfile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Header />
                <Router>
                    <Routes>
                        <Route path="/" element={<ContentBlock />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login-auth" element={<Login />} />
                        <Route path="/registration" element={<Register />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </Router>
                <Footer />
            </div>
        </QueryClientProvider>
    );
}

export default App;
