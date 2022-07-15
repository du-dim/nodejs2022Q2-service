import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocService {
  async getDoc() {
    const __dirname = path.resolve();
    const file_path_yaml = path.join(__dirname, 'doc', 'api.yaml');
    const file_path_html = path.join(__dirname, 'doc', 'api.html');

    const yaml = fs.readFileSync(file_path_yaml, 'utf8');
    const htmlStream = fs.createReadStream(file_path_html, 'utf8');
    const promise = new Promise((res) => {
      htmlStream.on('data', (data) => res(`${data}`.replace('{{yaml}}', yaml)));
    });
    return await promise;
  }
}
