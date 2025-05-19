import type { CreateUserDTO } from "../dtos/CreateUserDTO";

const USER_API = import.meta.env.VITE_USER_API_URL;

export const register = async (data: CreateUserDTO) => {
    const response = await fetch(`${USER_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error al registrar usuario");
    }

    return await response.json();
};
