import "dotenv/config";

export const ENV = process.env.ENV ?? "development"; // environment where the server is running
export const PORT = process.env.PORT ?? 3000; // port where the server will be running

export const ACEPTED_ORIGINS = process.env.ACEPTED_ORIGINS?.split(",") ?? ["http://localhost:3000"]; // origins allowed by CORS (FRONTEND)

export const DB_URL = process.env.DB_URL ?? "mongodb://localhost:27017"; // database url
export const DB_NAME = process.env.DB_NAME ?? "test"; // database name