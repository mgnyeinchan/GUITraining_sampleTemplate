import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../Home/Home";
import About from "../About/About";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoutes from "../Authentication/PrivateRoutes";
import { ProtectedRoute } from "../Authentication/ProtectedRoute";
export default function MyRoute() {
return (
<div className="App">
    <Router>
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/" exact/>
                <Route element={<About/>} path="/about"/>
                {/* <Route element={<Dashboard/>} path="/dashboard"/> */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route element={<Login/>} path="/login"/>
        </Routes>
    </Router>
</div>
);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyRoute />)