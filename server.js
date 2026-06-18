const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const { connectRedis } = require("./src/config/redis");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./src/docs/swagger");

connectRedis();

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", require("./src/routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Crowdly API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

