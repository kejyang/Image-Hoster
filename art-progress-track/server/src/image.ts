import * as mongodb from "mongodb";
 
export interface Image {
    _id?: mongodb.ObjectId;
    email: string;
    url: string;
    description?: string;
    date: number;
}