import * as fs from 'fs';
import * as path from 'path';
const fsp = fs.promises;

export class WriteLog {
  private errorFile: string;
  private totalFile: string;

  private async pathDir() {
    const dirError = path.join('src', 'logs', 'errorFiles');
    const dirTotal = path.join('src', 'logs', 'totalFiles');
    if (!fs.existsSync(dirError)) {
      await fsp.mkdir(dirError, { recursive: true });
    }
    if (!fs.existsSync(dirTotal)) {
      await fsp.mkdir(dirTotal, { recursive: true });
    }
    return { dirError, dirTotal };
  }

  private async pathError() {
    this.errorFile = 'error_1.log';
    const pathErrorDir = (await this.pathDir()).dirError;
    const filesError = await fsp.opendir(pathErrorDir);
    for await (const file of filesError) {
      const promis: Promise<string> = new Promise((res, req) => {
        fs.stat(path.join(pathErrorDir, file.name), function (err, stats) {
          const count = file.name.split('.')[0].split('_')[1];
          const size = process.env.LOGGER_SIZE;
          if (stats.isFile()) {
            if (stats.size / 1000 < +size) res(`error_${+count}.log`);
            else if (stats.size / 1000 >= +size) res(`error_${+count + 1}.log`);
            else res('');
          }
        });
      });
      this.errorFile = await promis;
    }
    return path.join(pathErrorDir, this.errorFile);
  }

  private async pathTotal() {
    this.totalFile = 'total_1.log';
    const pathTotalDir = (await this.pathDir()).dirTotal;
    const filesTotal = await fsp.opendir(pathTotalDir);
    for await (const file of filesTotal) {
      const promis: Promise<string> = new Promise((res, req) => {
        fs.stat(path.join(pathTotalDir, file.name), function (err, stats) {
          const count = file.name.split('.')[0].split('_')[1];
          const size = process.env.LOGGER_SIZE;
          if (stats.isFile()) {
            if (stats.size / 1000 < +size) res(`total_${+count}.log`);
            else if (stats.size / 1000 >= +size) res(`total_${+count + 1}.log`);
            else res('');
          }
        });
      });
      this.totalFile = await promis;
    }
    return path.join(pathTotalDir, this.totalFile);
  }

  async writeError(errorLog: string) {
    const pathError = await this.pathError();
    fs.appendFile(pathError, errorLog, { flag: 'a+' }, (err) => {
      if (err) throw err;
    });
  }

  async writeTotal(totalLog: string) {
    const pathTotal = await this.pathTotal();
    fs.appendFile(pathTotal, totalLog, { flag: 'a+' }, (err) => {
      if (err) throw err;
    });
  }
}
