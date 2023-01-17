import _ from 'lodash';
import { extname } from 'path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

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

const composeLeaf = (key, val1, val2) => {
  if (val1 === val2) {
    return {
      key, operation: 'nochange', val: val1, nodeType: 'leaf',
    };
  }
  return {
    key, operation: 'update', val: val2, oldVal: val1, nodeType: 'leaf',
  };
};

const genDiff = (tree1, tree2) => {
  const keys = getAllKeys(tree1, tree2);
  const diffs = keys.map((key) => {
    const val1 = _.get(tree1, key);
    const val2 = _.get(tree2, key);
    if (_.has(tree1, key) && _.has(tree2, key)) {
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        return {
          key, nodeType: 'branch', operation: 'nochange', children: genDiff(val1, val2),
        };
      }
      return composeLeaf(key, val1, val2);
    }
    const operation = _.has(tree1, key) ? 'delete' : 'add';
    const val = _.has(tree1, key) ? val1 : val2;
    return {
      key, nodeType: 'leaf', operation, val,
    };
  });
  return diffs;
};

const generateDiff = (filepath1, filepath2, format) => {
  const obj1 = readAndParseFile(filepath1);
  const obj2 = readAndParseFile(filepath2);
  const data = genDiff(obj1, obj2);
  try {
    return formatDiff(data, format);
  } catch (e) {
    return e.message;
  }
};

export default generateDiff;
