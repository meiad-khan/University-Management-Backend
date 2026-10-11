import express, { Application } from "express";
import cors from "cors"
import config from "./config";
import cookieParser from "cookie-parser";

export const app:Application=express();

app.use(
  cors({
    origin:config.frontend_url,
    credentials:true
  })
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());


app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'University Management API is running',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  })
})


app.use((req, res) => {
res.status(404).json({
success: false,
message: `Route not found: ${req.method} ${req.originalUrl}`,
errors: [],
});
});