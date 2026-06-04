import fs from "fs/promises";
import path from "path";
import { isFileExist, isDirExist } from "./utils/index.js";
import { endpointsGenerator } from "./utils/endpointsGenerator.js";
import {
  folderTemplate,
  openCollectionTemplate,
  requestFileTemplate,
} from "./utils/templates.js";

export function Postdog(router, { prefix = "", name = "" }) {
  (async () => {
    const endpoints = endpointsGenerator(router.stack, prefix);
    const projectName = name || "postdog";

    const collectionPath = path.join(process.cwd(), `./${projectName}`);
    if (!(await isDirExist(`${collectionPath}`))) {
      await fs.mkdir(`${collectionPath}`, { recursive: true });
    }

    if (!(await isFileExist(`${collectionPath}/opencollection.yml`))) {
      await fs.writeFile(
        `${collectionPath}/opencollection.yml`,
        openCollectionTemplate(projectName)
      );
    }

    if (!(await isFileExist()))
      for (let i in endpoints) {
        const ep = endpoints[i];

        if (!(await isDirExist(`${collectionPath}${ep.folder}`))) {
          await fs.mkdir(`${collectionPath}${ep.folder}`, {
            recursive: true,
          });

          await fs.writeFile(
            `${collectionPath}${ep.folder}/folder.yml`,
            folderTemplate(ep.folder.replace("/", ""))
          );
        }

        const requestName =
          ep.path !== "/"
            ? ep.path
            : `/${ep.methods[0]}_${prefix.replace("/", "")}`;
        const requestPath = `${collectionPath}${ep.folder}${requestName}.yml`;

        if (!(await isFileExist(requestPath)) || ep.path === "/") {
          await fs.writeFile(
            requestPath,
            requestFileTemplate(
              ep.path.replace("/", ""),
              ep.methods[0],
              `${prefix}${ep.path}`
            )
          );
        }
      }
  })();
  return router;
}
