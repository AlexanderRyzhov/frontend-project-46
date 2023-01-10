import _ from 'lodash';
import { extname } from 'path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import formatDiff from './formatters.js';

const readAndParseFile = (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = extname(filepath);
  return parse(data, format);
};

const getAllKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return keys;
};

const genDiff = (tree1, tree2) => {
  const keys = getAllKeys(tree1, tree2);
  let diffs = [];
  keys.forEach((key) => {
    const val1 = _.get(tree1, key);
    const val2 = _.get(tree2, key);
    let diff;
    if (_.has(tree1, key) && _.has(tree2, key)) {
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        diff = { nodeType: 'branch', operation: 'nochange', val: genDiff(val1, val2) };
      } else {
        if (val1 === val2) {
          diff = { operation: 'nochange', val: val1 };
        } else if (typeof val1 === 'object' && val1 !== null) {
          diff = { operation: 'update', val: val2, oldVal: genDiff(val1, val1) };
        } else if (typeof val2 === 'object' && val2 !== null) {
          diff = { operation: 'update', val: genDiff(val2, val2), oldVal: val1 };
        } else {
          diff = { operation: 'update', val: val2, oldVal: val1 };
        }
        diff.nodeType = 'leaf';
      }
    } else if (_.has(tree1, key)) {
      if (typeof val1 === 'object') {
        diff = { nodeType: 'branch', operation: 'delete', val: genDiff(val1, val1) };
      } else {
        diff = { nodeType: 'leaf', operation: 'delete', val: val1 };
      }
    } else if (_.has(tree2, key)) {
      if (typeof val2 === 'object') {
        diff = { nodeType: 'branch', operation: 'add', val: genDiff(val2, val2) };
      } else {
        diff = { nodeType: 'leaf', operation: 'add', val: val2 };
      }
    }
    diff.key = key;
    diffs = [...diffs, diff];
    return diffs;
  });
  return diffs;
};

const generateDiff = (filepath1, filepath2) => {
  const obj1 = readAndParseFile(filepath1);
  const obj2 = readAndParseFile(filepath2);
  const data = genDiff(obj1, obj2);
  const output = formatDiff(data);
  return output;
};

export default generateDiff;
