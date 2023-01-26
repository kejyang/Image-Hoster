import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const imageRouter = express.Router();
imageRouter.use(express.json());
 
imageRouter.get("/", async (_req, res) => {
   try {
       const images = await collections.images.find({}).toArray();
       res.status(200).send(images);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

 imageRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const image = await collections.images.findOne(query);
  
        if (image) {
            res.status(200).send(image);
        } else {
            res.status(404).send(`Failed to find a user: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an user: ID ${req?.params?.id}`);
    }
 }); 

 

 imageRouter.post("/", async (req, res) => {
    try {
        const image = req.body;
        const result = await collections.images.insertOne(image);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

  imageRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.images.updateOne(query, { $set: {
            title: req.body.title,
            description: req.body.description,
            comments: req.body.comments,
        } });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an user: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an user: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an user: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 }); 

  imageRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.images.deleteOne(query);
  
         if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        } 
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}); 
 