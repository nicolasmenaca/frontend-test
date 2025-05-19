import type {LikeDTO} from "./LikeDTO.ts";

export interface PostDTO {
    id: number;
    userId: number;
    content: string;
    createdAt: string;
    likes: LikeDTO[];
}
