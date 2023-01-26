import * as mongodb from "mongodb";
import { Url } from "url";
 
export interface Image {
    _id?: mongodb.ObjectId;
    title: string;
    email: string;
    url: string;
    description?: string;
    date: number;
    comments: string[];
}