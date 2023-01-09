import _ from 'lodash';
import { extname } from 'path';
import * as fs from 'node:fs';
import parse from './parsers.js';

const readAndParseFile = (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = extname(filepath);
  const obj = parse(data, format);
  return obj;
};

const getAllKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return keys;
};

const generateDiff = (filepath1, filepath2) => {
  const obj1 = readAndParseFile(filepath1);
  const obj2 = readAndParseFile(filepath2);
  const keys = getAllKeys(obj1, obj2);
  let diffs = [];
  keys.forEach((key) => {
    const val1 = _.get(obj1, key);
    const val2 = _.get(obj2, key);
    let line;
    let line2;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (val1 === val2) {
        line = `    ${key}: ${val1}`;
      } else {
        line = `  - ${key}: ${val1}`;
        line2 = `  + ${key}: ${val2}`;
      }
    } else {
      line = (_.has(obj1, key)) ? `  - ${key}: ${val1}` : `  + ${key}: ${val2}`;
    }
    diffs = !line2 ? [...diffs, line] : [...diffs, line, line2];
  });
  const output = `{\n${diffs.join('\n')}\n}`;
  return output;
};

export default generateDiff;
