import { useNavigate } from "react-router-dom";
import "./Home.css";
import type { UserProfileDTO } from "../../dtos/UserProfileDTO.ts";

const Home = () => {
    const navigate = useNavigate();
    const user: UserProfileDTO | null = JSON.parse(localStorage.getItem("user") || "null");

    const goToCreatePost = () => navigate("/create-post");
    const goToFeed = () => navigate("/posts");
    const goToProfile =() => navigate("/profile");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="home-container">
            <div className="Rectangle12"></div>
            <div className="Rectangle13"></div>
            <div className="Rectangle14"></div>
            <div className="Rectangle15"></div>
            <div className="Rectangle16"></div>

            <div className="ellipse-bg large-ellipse"></div>
            <div className="ellipse-bg medium-ellipse">
                <div className="outer-ellipse"></div>
            </div>
            <div className="ellipse-bg small-ellipse">
                <div className="outer-small-ellipse"></div>
            </div>
            <div className="ellipse-bg extra-small-ellipse">
                <div className="inner-ellipse"></div>
            </div>

            {/* Contenido principal */}
            <header className="header">
                <h1 className="bienvenida-texto">
                    BIENVENIDO {user?.nombre?.toUpperCase() ?? "USUARIO"}
                </h1>
            </header>

            <nav className="sidebar">
                <button className="menu-btn" onClick={goToCreatePost}>
                    CREAR PUBLICACIÓN
                </button>
                <button className="menu-btn" onClick={goToProfile}>
                    Ver Perfil
                </button>
                <button className="menu-btn" onClick={goToFeed}>
                    VER PUBLICACIONES
                </button>
                <button className="menu-btn" onClick={handleLogout}>
                    CERRAR SESIÓN
                </button>
            </nav>
        </div>
    );
};

export default Home;
