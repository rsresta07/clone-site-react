import "./App.css";
import Header from "./components/Header";
import ContentBlock from "./components/ContentBlock";
import Footer from "./components/Footer";
import "./css/GlobalStyles.css";

function App() {
    return (
        <div className="App">
            <Header />
            <ContentBlock />
            <Footer />
        </div>
    );
}

export default App;
