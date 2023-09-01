import "dotenv/config";

export const ENV = process.env.ENV ?? "development"; // environment where the server is running
export const PORT = process.env.PORT ?? 3000; // port where the server will be running

export const ACEPTED_ORIGINS = process.env.ACEPTED_ORIGINS?.split(",") ?? ["http://localhost:3000"]; // origins allowed by CORS (FRONTEND)