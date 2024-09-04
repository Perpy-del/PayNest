import path from 'path';
import * as rfs from 'rotating-file-stream';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pad = (num: number | string) => (num as number > 9 ? num : `0${num}`);

const generator = () => {
  const time: Date = new Date();

  const year: number = time.getFullYear();
  const month: string | number = pad(time.getMonth() + 1);
  const day: number | string = pad(time.getDate());

  return `paynest-${year}-${month}-${day}.log`;
};

const rotatingFileStream: rfs.RotatingFileStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, './storage/logs'),
});

export default rotatingFileStream;