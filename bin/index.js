import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import chalk from "chalk";

export async function start() {
  const { projectVersion, projectName } = await getVersion();
  console.info(chalk.green(`Start to release version to ${projectName}...`));
  const newVersion = await getNewVersion(projectVersion);
  writeNewVersion();
  console.info(
    chalk.green(
      `\nVersion: ${chalk.cyan(`${projectVersion} -> ${newVersion}`)}`
    )
  );
  console.info(chalk.green(`${projectName} version to ${newVersion}`));
  await execShell();

  // 获取当前版本号
  function getVersion() {
    const packageJson = fs.readFileSync(
      path.resolve(process.cwd(), "package.json"),
      "utf8"
    );
    return {
      projectVersion: JSON.parse(packageJson).version,
      projectName: JSON.parse(packageJson).name,
    };
  }

  //生成新的版本号
  function getNewVersion(oldVersion) {
    let [major, minor, patch] = oldVersion.split(".");
    if (patch.length > 2 && patch.includes("-beta")) {
      patch = patch.split("-")[0];
    }
    return `${major}.${minor}.${+patch + 1}`;
  }

  //写入新版本号，更新项目文件
  function writeNewVersion() {
    const packageJson = readFileSync(
      resolve(process.cwd(), "package.json"),
      "utf8"
    );
    const newPackageJson = packageJson.replace(
      `"version": "${projectVersion}"`,
      `"version": "${newVersion}"`
    );
    writeFileSync(resolve(process.cwd(), "package.json"), newPackageJson);
    console.info(chalk.green("\nUpdate package.json success!"));
  }

  // 执行shell命令
  async function execShell() {
    let branch = "main";

    const echo1 = `${chalk.green("[ 1 / 3 ]")} ${chalk.cyan(
      `Commit and push to ${branch} branch`
    )}`;
    const part1 = [
      "git add .",
      `git commit -m "release to ${newVersion}"`,
      `git push origin ${branch}`,
    ];
    const echo2 = `${chalk.green("[ 3 / 3 ]")} ${chalk.cyan("Publish to NPM")}`;
    const part2 = ["npm run build:component", "npm publish"];
    await step(echo1, part1);
    await step(echo2, part2);
  }

  // 处理命令执行结果
  async function step(desc, command) {
    console.log(desc);
    return new Promise((resolve, reject) => {
      const childExec = exec(
        command.join(" && "),
        { maxBuffer: 10000 * 10240 },
        (err, stdout, stderr) => {
          console.log(err, stdout, stderr);
          if (err) {
            reject(err);
            console.info(chalk.red(`exec ${command} failed by reason: ${err}`));
            throw err;
          } else {
            resolve("");
          }
        }
      );
      childExec.stdout?.pipe(process.stdout);
      childExec.stderr?.pipe(process.stderr);
    });
  }
}

start();
