import type {LoginDTO} from "./LoginDTO.ts";

export interface AuthResponseDTO {
    token: string;
    user: Omit<LoginDTO, "password">;
}