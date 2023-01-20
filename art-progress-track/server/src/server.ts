import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { userRouter } from "./user.routes";
import { imageRouter } from "./image.routes";
import { connectToDatabase } from "./database";
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;

function opensnack(text: string) : void {
  console.log(text);
  //this.userService.get();
}


/*const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:4200',
    clientID: 'tcqmN2E0cd95AMRerG0tIfqtvstYsLo6',
    issuerBaseURL: 'https://dev-7lul6xrih3fszlxk.us.auth0.com'
  };*/
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}

connectToDatabase(ATLAS_URI)
   .then(() => {
      const app = express();
      app.get('/', (req, res) => {
        res.sendStatus(200)
      })
      app.use(cors());
 
       //app.use(auth(config));
       /*app.get('/', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
      });*/
      app.use("/users", userRouter);
      app.use("/images", imageRouter);
      // start the Express server
      app.listen(5200, () => {
        console.log(`Server running at http://localhost:5200...`);
      });
      setInterval(opensnack, 10000, "my text");
      
 
   })
   .catch(error => console.error(error));