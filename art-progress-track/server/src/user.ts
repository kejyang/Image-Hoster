import * as mongodb from "mongodb";
 
export interface User {
   email: string;
   images: string[];
   _id?: mongodb.ObjectId;
}