import pm2Manager from "../utils/pm2.manager";

class PM2Controller {
  async getProcesses() {
    const processes = await pm2Manager.listProcesses();
    return processes;
  }
}

export default new PM2Controller();
