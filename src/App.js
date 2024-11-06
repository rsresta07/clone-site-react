import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentBlock from "./components/ContentBlock";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import "./css/GlobalStyles.css";
import "./js/api.js";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<ContentBlock />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
