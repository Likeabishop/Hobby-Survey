import fs from 'fs';
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';

// Import Routes
import surveyRoutes from "./routes/survey.routes.js";


// Configurations
dotenv.config();
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(express.urlencoded({extended: false}));

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3001"], // Frontend URL
    credentials: true, // Allow cookies and other credentials
  };
  
app.use(cors(corsOptions));

app.use('/api/survey', surveyRoutes);

// Server/Api
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Hobby Survey Server running on port ${port}`);   
});
