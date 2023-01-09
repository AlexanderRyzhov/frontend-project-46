import yaml from 'js-yaml';
import { extname } from 'path';
import * as fs from 'node:fs';

const parse = (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = extname(filepath);
  let parseFunction;
  if (format === '.json') {
    parseFunction = JSON.parse;
  }
  if (format === '.yml' || format === '.yaml') {
    parseFunction = yaml.load;
  }
  return parseFunction(data);
};

export default parse;
