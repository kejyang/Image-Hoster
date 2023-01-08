import * as mongodb from "mongodb";
import { Image } from "./image";
 
export interface User {
   email: string;
   images: Image[];
   _id?: mongodb.ObjectId;
}