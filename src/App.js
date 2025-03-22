import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import News from "./components/News";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <main>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/a-propos" exact component={About} />
                    <Route path="/news" exact component={News} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </main>
    );
}

export default App;
