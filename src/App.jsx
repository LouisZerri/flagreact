import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import News from "./components/News";

function App() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/news" element={<News />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right" theme="colored" />
        </main>
    );
}

export default App;
