import type { UserProfileDTO } from "../dtos/UserProfileDTO";
import type { PostDTO } from "../dtos/PostDTO";

const USER_API = import.meta.env.VITE_USER_API_URL;
const POST_API = import.meta.env.VITE_POST_API_URL;

export const getUserById = async (id: number): Promise<UserProfileDTO> => {
    const response = await fetch(`${USER_API}/${id}`);
    if (!response.ok) throw new Error("No se pudo cargar el usuario");
    return await response.json();
};

export const getPostsByUserId = async (): Promise<PostDTO[]> => {
    const response = await fetch(`${POST_API}/posts`);
    if (!response.ok) throw new Error("No se pudieron cargar las publicaciones");
    return await response.json();
};
