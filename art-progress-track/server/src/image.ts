import * as mongodb from "mongodb";
import { Url } from "url";
 
export interface Image {
    _id?: mongodb.ObjectId;
    email: string;
    url: string;
    description?: string;
    date: number;
}