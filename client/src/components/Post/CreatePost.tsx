import "./CreatePost.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type {CreatePostDTO} from "../../dtos/CreatePostDTO.ts";
import {createPost} from "../../services/PostService.ts";

export default function CreatePost() {
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handlePost = async () => {
        setError(null);
        setSuccess(false);

        if (!user || !user.nombre) {
            setError("Usuario no autenticado.");
            return;
        }

        if (!content.trim()) {
            setError("El contenido no puede estar vacío.");
            return;
        }

        const postData: CreatePostDTO = {
            userId: user.id,
            content: content.trim(),
        };

        try {
            setLoading(true);
            await createPost(postData);
            setContent("");
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Error al crear la publicación.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-container">
            <div className="post-card">
                <h2 className="post-title">Crear publicación</h2>
                <textarea
                    className="post-textarea"
                    placeholder="¿Qué estás pensando?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="post-btn" onClick={handlePost} disabled={loading}>
                    {loading ? "Publicando..." : "Publicar"}
                </button>
                {error && <p className="post-error">{error}</p>}
                {success && <p className="post-success">¡Publicación creada!</p>}
            </div>
        </div>
    );
}
