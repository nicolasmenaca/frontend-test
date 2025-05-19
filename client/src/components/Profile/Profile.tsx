import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { UserProfileDTO } from "../../dtos/UserProfileDTO";
import type { PostDTO } from "../../dtos/PostDTO";
import "./Profile.css";
import {getPostsByUserId, getUserById} from "../../services/UserProfileService.ts";

export default function Profile() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserProfileDTO | null>(null);
    const [userPosts, setUserPosts] = useState<PostDTO[]>([]);

    useEffect(() => {
        if (user) {
            loadUserProfile(user.id);
        }
    }, [user]);

    const loadUserProfile = async (userId: number) => {
        try {
            const userInfo = await getUserById(userId);
            const allPosts = await getPostsByUserId();
            const userRelatedPosts = allPosts.filter((post) => post.userId === userId);
            setUserData(userInfo);
            setUserPosts(userRelatedPosts);
        } catch (error) {
            console.error("Error al cargar el perfil:", error);
        }
    };

    if (!userData) return <div>Cargando perfil...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-title">Mi Perfil</h2>
                <p><strong>Nombre:</strong> {userData.nombre} {userData.apellido}</p>
                <p><strong>Alias:</strong> @{userData.alias}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Nacimiento:</strong> {userData.fechaNacimiento}</p>
            </div>

            <div className="post-list-container">
                <h3 className="post-header">Mis Publicaciones</h3>
                {userPosts.length === 0 && <p>No tienes publicaciones todavía.</p>}
                {userPosts.map((post) => (
                    <div key={post.id} className="post-card">
                        <div className="post-content">{post.content}</div>
                        <div className="post-footer">
                            <span>{post.likes.length} ❤️</span>
                            <span>{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
