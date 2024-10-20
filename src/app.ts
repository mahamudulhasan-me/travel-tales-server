import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Travel Tales Server is Running!");
});

app.use(globalErrorHandler);
app.use(notFound);
// Serve static files from the "public" directory

export default app;
