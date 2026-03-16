import pm2 from "pm2";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

class PM2Manager {
  async listProcesses() {
    return new Promise((resolve, reject) => {
      pm2.list((err, list) => (err ? reject(err) : resolve(list)));
    });
  }

  formatProcesses(processes) {
    return processes.map((p) => ({
      pm2Id: p.id,
      name: p.name,
      pid: p.pid,
      status: p.pm2_env?.status,
      cpu: p.monit?.cpu || 0,
      memory: p.monit?.memory || 0,
      uptime: p.pm2_env?.pm_uptime,
    }));
  }

  async getProcessErrorLogs(processName, lines = 15) {
    try {
      const logPath = path.join(
        os.homedir(),
        ".pm2",
        "logs",
        `${processName}-error.log`,
      );
      const data = await fs.readFile(logPath, "utf-8");
      console.log(data);

      return data.split("\n").filter(Boolean).slice(-lines);
    } catch {
      return [];
    }
  }

  async getLogs(processName, lines) {
    try {
      const logPath = path.join(
        os.homedir(),
        ".pm2",
        "logs",
        `${processName}-out.log`,
      );
      const data = await fs.readFile(logPath, "utf-8");
      return data.split("\n").filter(Boolean).slice(-lines);
    } catch {
      return [];
    }
  }
}

export default new PM2Manager();
