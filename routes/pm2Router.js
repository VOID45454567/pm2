import express from "express";
import pm2Controller from "../controllers/pm2Controller.js";

const router = express.Router();

router.get("/processes", async (req, res) => {
  const processes = await pm2Controller.getProcesses();
  res.json({ success: true, data: processes, timestamp: new Date() });
});

router.get("/check-status/:lines?", async (req, res) => {
  const status = await pm2Controller.checkStatus(req.params.lines);
  res.json({ path: req.path, success: true, ...status, timestamp: new Date() });
});

export default router;
