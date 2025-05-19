import { useAuth } from "../components/context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import CreatePost from "../components/Post/CreatePost";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile.tsx";
import Register from "../components/Register/Register.tsx";

const AppRouter = () => {
    const { token } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
                <Route path="/create-post" element={token ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path="/posts" element={token ? <Post /> : <Navigate to="/login" />} />
                <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
