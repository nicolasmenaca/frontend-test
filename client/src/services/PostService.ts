import type {CreatePostDTO} from "../dtos/CreatePostDTO.ts";

const BASE_URL = import.meta.env.VITE_POST_API_URL;
console.log("POST API URL:", BASE_URL);

import type { PostDTO } from "../dtos/PostDTO";
import type { LikeDTO } from "../dtos/LikeDTO";

export const createPost = async (postData: CreatePostDTO): Promise<PostDTO> => {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error("Error al crear la publicación");
    }

    return await response.json();
};
export const unlikePost = async (postId: number, userId: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/likes/unlike`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId }),
    });

    if (!response.ok) {
        throw new Error("Error al quitar like");
    }
};

export const getAllPosts = async (): Promise<PostDTO[]> => {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
        throw new Error("Error al obtener publicaciones");
    }
    return await response.json();
};

export const getPostById = async (id: number): Promise<PostDTO> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error("Publicación no encontrada");
    }
    return await response.json();
};

export const deletePost = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Error al eliminar la publicación");
    }
};

export const likePost = async (postId: number, userId: number): Promise<LikeDTO> => {
    const response = await fetch(`${BASE_URL}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId }),
    });

    if (!response.ok) {
        throw new Error("Error al dar like");
    }

    return await response.json();
};

export const getLikesByPostId = async (postId: number): Promise<LikeDTO[]> => {
    const response = await fetch(`${BASE_URL}/likes/${postId}`);
    if (!response.ok) {
        throw new Error("Error al obtener los likes");
    }
    return await response.json();
};
