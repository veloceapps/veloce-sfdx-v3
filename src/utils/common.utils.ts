import { exec as nodeExec } from 'node:child_process';

export const exec = (cmd: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    nodeExec(cmd, (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(result);
      }
    });
  });
};
