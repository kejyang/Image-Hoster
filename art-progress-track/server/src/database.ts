import * as mongodb from "mongodb";
import { User } from "./user";
import { Image } from "./image";
 
export const collections: {
   users?: mongodb.Collection<User>;
   images?: mongodb.Collection<Image>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applySchemaValidationUser(db);
   await applySchemaValidationImage(db);
 
   const usersCollection = db.collection<User>("users");
   collections.users = usersCollection;

   const imagesCollection = db.collection<Image>("images");
   collections.images = imagesCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidationUser(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["email", "images"],
           additionalProperties: false,
           properties: {
               _id: {},
               email: {
                   bsonType: "string",
                   description: "'email' is required and is a string",
               },
               images: {
                   bsonType: "array",
                   description: "'images' is required and is an array",
               },
           },
       },
   };
   
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "users",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("users", {validator: jsonSchema});
       }
   });
}

async function applySchemaValidationImage(db: mongodb.Db) {
    const jsonSchemaImage = {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "url", "date"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {},
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                },
                url: {
                    bsonType: "string",
                    description: "'images' is required and is a string",
                },
                description: {},
                date: {
                    bsonType: "number",
                    description: "'date' is required and is a number",
                },
            },
        },
    };
    await db.command({
        collMod: "images",
        validator: jsonSchemaImage
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("images", {validator: jsonSchemaImage});
        }
    });
 }