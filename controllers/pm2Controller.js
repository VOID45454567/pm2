import pm2Manager from "../utils/pm2.manager.js";

class PM2Controller {
  async getProcesses() {
    return pm2Manager.formatProcesses(await pm2Manager.listProcesses());
  }

  async checkStatus(lines) {
    const processes = await this.getProcesses();

    const processesWithLogs = await Promise.all(
      processes.map(async (proc) => {
        const errorLogs = await pm2Manager.getProcessErrorLogs(
          proc.name,
          lines,
        );

        const hasErrors = errorLogs.length > 0;
        const isProblematic = proc.status !== "online" || hasErrors;

        return {
          ...proc,
          Error_logs: errorLogs.length ? errorLogs : undefined,
          hasErrors,
          isProblematic,
          warning: hasErrors ? "Есть записи в error логах" : undefined,
        };
      }),
    );

    return {
      summary: {
        total: processes.length,
        online: processes.filter((p) => p.status === "online").length,
        withErrors: processesWithLogs.filter((p) => p.hasErrors).length,
        allGood: processesWithLogs.filter((p) => p.isProblematic).length === 0,
      },
      processes: processesWithLogs,
    };
  }
}

export default new PM2Controller();
