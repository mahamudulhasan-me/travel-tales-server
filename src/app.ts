import cors from "cors";
import express from "express";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app = express();

app.use(express.json());
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Car Washing System Booking is Running!");
});

app.use(globalErrorHandler);
app.use(notFound);
// Serve static files from the "public" directory

export default app;
