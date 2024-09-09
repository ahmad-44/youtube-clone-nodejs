import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// set up cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//set configurations for data acceptance
// 1. Configure data coming through Json
app.use(express.json({ limit: "16kb" }));

// 2. Configure data coming through URLs
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// 3. Configure static files i.e PDFs and Images etc
app.use(express.static("public"));

// use cookies parser as well. it is used to CRUD on browser cookies
app.use(cookieParser());

export { app };
