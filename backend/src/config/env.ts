import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV ?? "development";

if (!["development", "test", "production"].includes(NODE_ENV)) {
    throw new Error(`Invalid environment: ${NODE_ENV}`);
}

if (NODE_ENV !== "production") {
    dotenv.config({
        path: `.env.${NODE_ENV}`,
        quiet: true,
    });
}

function required(name: string): string {
    const value = process.env[name];
    if (value === undefined || value === "") {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    NODE_ENV,
    PORT: Number(process.env.PORT) || 3000,

    DB_DIALECT: process.env.DB_DIALECT || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_NAME: required("DB_NAME"),
    DB_USER: required("DB_USER"),
    DB_PASSWORD: process.env.DB_PASSWORD ?? "",
};
