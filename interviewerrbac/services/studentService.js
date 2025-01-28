const path = require("path");
const { Worker } = require("worker_threads");

const rootPath = require("../util/rootPath");

exports.performActions = (actions, students, id) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.resolve(rootPath, "workers", "studentWorker.js"),
      {
        workerData: { actions, students, id },
      }
    );

    worker.on("message", (result) => {
      if (result.status === "error") {
        reject(new Error(result.message));
      } else {
        resolve(result);
      }
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
};
