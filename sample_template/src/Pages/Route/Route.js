import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Login from "../Login/Login";
export default function MyRoute() {
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
root.render(<MyRoute />)