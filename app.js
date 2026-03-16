import express from "express";
import pm2Router from "./routes/pm2Router.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/pm2", pm2Router);

app.get("/", (req, res) => {
  res.json({
    message: "Server running",
    endpoints: {
      processes: "/api/pm2/processes",
      status: "/api/pm2/check-status/:lines",
    },
  });
});

app.listen(PORT, () => {
  console.log(`started on ${PORT}`);
});
