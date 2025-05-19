import axios from "axios";
import type { UserProfileDTO } from "../dtos/UserProfileDTO.ts";

const authUrl = import.meta.env.VITE_AUTH_API_URL;

export const login = async (
    email: string,
    password: string
): Promise<{ token: string; user: UserProfileDTO }> => {
    const response = await axios.post(`${authUrl}/login`, { email, password });
    return response.data;
};

export const getProfile = async (token: string): Promise<UserProfileDTO> => {
    const response = await axios.get(`${authUrl}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
