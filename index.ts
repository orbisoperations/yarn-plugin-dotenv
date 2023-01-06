import { Hooks, Project } from "@yarnpkg/core";
import { config } from "dotenv";
import findConfig from "find-config";

export const hooks: Hooks = {
  async setupScriptEnvironment(project: Project, scriptEnv) {
    const rootCwd = project.cwd.split("/");
    const currentCwd = process.cwd().split("/");
    const directoriesToTraverse = currentCwd.length - rootCwd.length;
    let configPath: string | null = null;
    let envFile = ".env";
    for (let i = 0; i <= directoriesToTraverse; i += 1 ) {
        if (findConfig(envFile)) {
          configPath = findConfig(envFile);
          break;
        }
        envFile = `../${envFile}`;
    }
    console.log(`using dot-env file: ${configPath}`);
    const env = config({
      path: configPath ?? undefined,
    });
    Object.assign(scriptEnv, env.parsed);
  },
};
