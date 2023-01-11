import _ from 'lodash';

const getPrefixes = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const prefix = replacer.repeat(spacesCount * (depth + 1) - 2);
  const bracePrefix = replacer.repeat(spacesCount * depth);
  return { prefix, bracePrefix };
};

const stylish = (data, depth = 0) => {
  if (data === undefined || data === null || typeof data !== 'object') {
    return String(data);
  }
  let lines;
  const { prefix, bracePrefix } = getPrefixes(depth);
  const currentDepth = depth + 1;
  if (Array.isArray(data)) {
    lines = data.flatMap(({
      key, val, oldVal, operation,
    }) => {
      let result = [];
      const valStr = stylish(val, currentDepth);
      if (operation === 'update') {
        const oldValStr = stylish(oldVal, currentDepth);
        result = [`${prefix}- ${key}: ${oldValStr}`, `${prefix}+ ${key}: ${valStr}`];
      } else if (operation === 'add') {
        result = `${prefix}+ ${key}: ${valStr}`;
      } else if (operation === 'delete') {
        result = `${prefix}- ${key}: ${valStr}`;
      } else if (operation === 'nochange') {
        result = `${prefix}  ${key}: ${valStr}`;
      }
      return result;
    });
  } else {
    const keys = _.sortBy(_.keys(data));
    lines = keys.map((key) => `${prefix}  ${key}: ${stylish(data[key], currentDepth)}`);
  }
  return ['{', ...lines, `${bracePrefix}}`].join('\n');
};

export default stylish;
