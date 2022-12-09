import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/categoriesRoutes.js";
dotenv.config();

import categoriesRouter from "./routes/categoriesRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(categoriesRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
