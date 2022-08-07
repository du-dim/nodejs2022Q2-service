import * as fs from 'fs';
import * as path from 'path';
const fsp = fs.promises;

export class WriteLog {
  private numError = [] as number[];
  private numTotal = [] as number[];
  size = process.env.LOGGER_SIZE;

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

  private async lastError() {
    const pathErrorDir = (await this.pathDir()).dirError;
    const filesError = await fsp.opendir(pathErrorDir);
    for await (const file of filesError) {
      const count = file.name.split('.')[0].split('_')[1];
      if (+count > 0) {
        this.numError.push(+count);
      }
    }
    return this.numError.slice(-1)[0];
  }

  private async lastTotal() {
    const pathTotalDir = (await this.pathDir()).dirTotal;
    const filesTotal = await fsp.opendir(pathTotalDir);
    for await (const file of filesTotal) {
      const count = file.name.split('.')[0].split('_')[1];
      if (+count > 0) {
        this.numTotal.push(+count);
      }
    }
    return this.numTotal.slice(-1)[0];
  }

  async writeError(errorLog: string) {
    const pathErrorDir = (await this.pathDir()).dirError;
    const lastNum = await this.lastError();
    if (!lastNum) {
      const pathError = path.join(pathErrorDir, 'error_1.log');
      fs.appendFile(pathError, errorLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
      return;
    }
    const errorFile = `error_${lastNum}.log`;
    const pathError = path.join(pathErrorDir, errorFile);
    const fileStats = await fsp.stat(pathError);
    if (+this.size - 0.5 > fileStats.size / 1024) {
      fs.appendFile(pathError, errorLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
    } else {
      const errorFile = `error_${lastNum + 1}.log`;
      const pathError = path.join(pathErrorDir, errorFile);
      fs.appendFile(pathError, errorLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
    }
  }

  async writeTotal(totalLog: string) {
    const pathTotalDir = (await this.pathDir()).dirTotal;
    const lastNum = await this.lastTotal();
    if (!lastNum) {
      const pathTotal = path.join(pathTotalDir, 'total_1.log');
      fs.appendFile(pathTotal, totalLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
      return;
    }
    const totalFile = `total_${lastNum}.log`;
    const pathTotal = path.join(pathTotalDir, totalFile);
    const fileStats = await fsp.stat(pathTotal);
    if (+this.size - 0.5 > fileStats.size / 1024) {
      fs.appendFile(pathTotal, totalLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
    } else {
      const totalFile = `total_${lastNum + 1}.log`;
      const pathTotal = path.join(pathTotalDir, totalFile);
      fs.appendFile(pathTotal, totalLog, { flag: 'a+' }, (err) => {
        if (err) throw err;
      });
    }
  }
}
