import pm2 from "pm2";

class PM2Manager {
  async listProcesses() {
    return new Promise((resolve, reject) => {
      pm2.list((err, list) => {
        if (err) reject(err);
        else resolve(list);
      });
    });
  }

  formatProcesses(processes) {
    return processes.map((process) => ({
      name: process.name,
      pid: process.pid,
      status: process.pm2_env?.status,
      cpu: process.monit?.cpu || 0,
      memory: process.monit?.memory || 0,
      uptime: process.pm2_env?.pm_uptime,
    }));
  }
}

export default new PM2Manager();
