import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentBlock from "./components/ContentBlock";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import "./css/tailwind.css";
import "./css/GlobalStyles.css";
import "./js/api.js";
import Cart from "./features/Cart.js";
import Login from "./components/LoginDash";
import Register from "./components/RegisterDash";
import UserProfile from "./components/UserProfile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/UserContext"; // Import UserProvider

import store from "./app/store";
import { Provider } from "react-redux";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <UserProvider>
                    <Provider store={store}>
                        <div className="App">
                            <Header />
                            <Routes>
                                <Route path="/" element={<ContentBlock />} />
                                <Route
                                    path="/movie/:id"
                                    element={<MovieDetails />}
                                />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login-auth" element={<Login />} />
                                <Route
                                    path="/registration"
                                    element={<Register />}
                                />
                                <Route
                                    path="/profile"
                                    element={<UserProfile />}
                                />
                            </Routes>
                            <Footer />
                        </div>
                    </Provider>
                </UserProvider>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
