import "dotenv/config";

export const ENV = process.env.ENV ?? "development";
export const PORT = process.env.PORT ?? 3000;

export const ACEPTED_ORIGINS = process.env.ACEPTED_ORIGINS?.split(",") ?? ["http://localhost:3000"];