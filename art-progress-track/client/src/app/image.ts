import { Comment } from "./comment";

export interface Image {
    _id?: string;
    title: string;
    email?: string;
    url?: string;
    description?: string;
    date?: number;
    comments?: Comment[];
}