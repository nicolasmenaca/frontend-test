import { useEffect, useState } from "react";
import { getAllPosts, likePost, unlikePost } from "../../services/PostService";
import type { PostDTO } from "../../dtos/PostDTO";
import { useAuth } from "../context/AuthContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./Post.css";

export default function Post() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<PostDTO[]>([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
    };

    const handleLikeToggle = async (post: PostDTO) => {
        if (!user) return;

        const alreadyLiked = post.likes.some((like) => like.userId === user.id);

        try {
            if (alreadyLiked) {
                await unlikePost(post.id, user.id);
            } else {
                await likePost(post.id, user.id);
            }
            await loadPosts(); // actualizar estado
        } catch (error) {
            console.error("Error al alternar like:", error);
        }
    };

    const userLiked = (post: PostDTO) => {
        if (!user) return false;
        return post.likes.some((like) => like.userId === user.id);
    };

    return (
        <div className="post-list-container">
            <h2 className="post-header">Publicaciones</h2>
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-content">{post.content}</div>
                    <div className="post-footer">
                        <button
                            className={`like-button ${userLiked(post) ? "liked" : ""}`}
                            onClick={() => handleLikeToggle(post)}
                        >
                            {userLiked(post) ? <FaHeart /> : <FaRegHeart />}
                            <span>{post.likes.length}</span>
                        </button>
                        <div className="post-date">
                            {new Date(post.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
