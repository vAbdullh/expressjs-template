const path = require("path");
// Load environment variables from .env.dev
require("dotenv").config({ path: path.resolve(__dirname, "../.env.dev") });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");

const db = require("./configs/db");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

if (!PORT) {
  console.error("PORT is not defined in .env.dev — aborting.");
  process.exit(1);
}
if (!API_KEY) {
  console.error("API_KEY is not defined in .env.dev — aborting.");
  process.exit(1);
}

console.log("──────────────────────────────────────────");
console.log(" Environment Check");
console.log(`├─ NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`├─ PORT     : ${PORT}`);
console.log(`└─ API_KEY  : ${API_KEY.slice(0, 6)}*****`);
console.log("──────────────────────────────────────────");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/health", healthRoutes);
app.use("/v1/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const start = async () => {
  try {
    await db.connect();

    app.listen(PORT, () => {
      console.log("──────────────────────────────────────────");
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Docs   → http://localhost:${PORT}/v1/api/docs`);
      console.log(`Health → http://localhost:${PORT}/v1/api/health`);
      console.log("──────────────────────────────────────────");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
