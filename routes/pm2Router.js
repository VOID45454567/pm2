import express from "express";
import pm2Manager from "../utils/pm2.manager.js";
const router = express.Router();

router.get("/processes", async (req, res) => {
  const processes = await pm2Manager.listProcesses();
  res.json({
    success: true,
    message: pm2Manager.formatProcesses(processes),
    timestamp: new Date().toISOString(),
  });
});

export default router;
