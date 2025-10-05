import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "@/routes/routes";

import * as swaggerDocumentRaw from "../dist/swagger.json";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const router = express.Router();
RegisterRoutes(router);
app.use("/api", router);

const swaggerDocument = {
  ...swaggerDocumentRaw,
  paths: Object.fromEntries(
    Object.entries(swaggerDocumentRaw.paths).map(([path, value]) => [
      `/api${path}`,
      value,
    ])
  ),
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
