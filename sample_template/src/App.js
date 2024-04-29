import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />}></Route>
<Route path="/about" element={<About />}></Route>
<Route path="/login" element={<Login />}></Route>
<Route path="/das" element={<Login />}></Route>
</Routes>
</BrowserRouter>
);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)