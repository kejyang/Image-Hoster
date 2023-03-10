import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const userRouter = express.Router();
userRouter.use(express.json());
 
userRouter.get("/", async (_req, res) => {
   try {
       const users = await collections.users.find({}).toArray();
       res.status(200).send(users);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

 userRouter.get("/:email", async (req, res) => {
    try {
        const _email = req?.params?.email;
        const user = await collections.users.findOne({email: _email});
  
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`Failed to find a user: ID ${_email}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an user: ID ${req?.params?.email}`);
    }
 });

 userRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.users.insertOne(user);
  
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


 userRouter.put("/:email", async (req, res) => {
    try {
        const _email = req?.params?.email;
        const user = req.body;
        const query = { email: _email };
        const result = await collections.users.updateOne(query, { $set: {
            email: req.body.email,
            images: req.body.images,
        } });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an user: ID ${_email}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an user: ID ${_email}`);
        } else {
            res.status(304).send(`Failed to update an user: ID ${_email}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });
 